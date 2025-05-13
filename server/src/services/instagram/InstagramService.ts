import { Server as SocketIOServer } from 'socket.io';
import AccountModel, { IAccount } from '../../models/Account.js';
import StreamModel, { IStream } from '../../models/Stream.js';
import SessionManager from './SessionManager.js';
import logger from '../../utils/logger.js';
import pLimit from 'p-limit';
import { POLL_INTERVAL_MS, CONCURRENCY } from '../../config.js';

export default class InstagramService {
  private sessionManager = new SessionManager();
  private limit = pLimit(CONCURRENCY);

  constructor(private io: SocketIOServer) {}

  public start() {
    logger.info('Starting Instagram live polling service');
    this.checkAllAccounts();
    setInterval(() => this.checkAllAccounts(), POLL_INTERVAL_MS);
  }

  private async checkAllAccounts() {
    const accounts = await AccountModel.find();
    await Promise.all(accounts.map(account => this.limit(() => this.checkAccount(account))));
  }

  private async checkAccount(account: IAccount) {
    try {
      const ig = await this.sessionManager.login(account);
      // Fetch current live broadcast for this account
      const userId = await ig.user.getIdByUsername(account.username);
      let lives: any[] = [];
      try {
        const broadcast = await ig.live.create({ targetUserId: userId });
        lives = [broadcast];
      } catch {
        lives = [];
      }
      const liveIds = lives.map(l => l.broadcast_id.toString());

      // liveIds will be used to mark ended streams
      for (const live of lives) {
        let stream = await StreamModel.findOne({ igStreamId: live.broadcast_id });
        const payload: Partial<IStream> = {
          account: account.username,
          igStreamId: live.broadcast_id,
          title: live.broadcast_title ?? '',
          startTime: new Date((live.started_at ?? live.published_time) * 1000),
          viewerCount: live.viewer_count,
          streamUrl: live.dash_abr_playback_url ?? '',
          isActive: true,
        };
        if (!stream) {
          stream = await StreamModel.create(payload);
          this.io.to(account.username).emit('streamStarted', stream);
          logger.info(`Stream started for ${account.username}: ${stream.igStreamId}`);
        } else {
          Object.assign(stream, payload);
          await stream.save();
          this.io.to(account.username).emit('streamUpdated', stream);
        }
      }

      // Mark ended streams and emit events
      const endedStreams = await StreamModel.find({ account: account.username, isActive: true, igStreamId: { $nin: liveIds } });
      for (const ended of endedStreams) {
        ended.isActive = false;
        await ended.save();
        this.io.to(account.username).emit('streamEnded', ended);
      }
    } catch (err: any) {
      logger.error(`Error polling ${account.username}: ${err.message}`);
    }
  }
}
