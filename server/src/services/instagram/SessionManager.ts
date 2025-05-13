import { IgApiClient, IgCheckpointError } from 'instagram-private-api';
import AccountModel, { IAccount } from '../../models/Account.js';
import logger from '../../utils/logger.js';

export default class SessionManager {
  private ig: IgApiClient;

  constructor() {
    this.ig = new IgApiClient();
    // Generate device for the username
    this.ig.state.generateDevice('');
  }

  async login(account: IAccount): Promise<IgApiClient> {
    if (account.session) {
      await this.ig.state.deserialize(account.session);
    }
    try {
      await this.ig.account.currentUser();
      return this.ig;
    } catch (e) {
      logger.info(`Session expired for ${account.username}, re-login`);
      return this.refresh(account);
    }
  }

  async refresh(account: IAccount): Promise<IgApiClient> {
    try {
      const { username } = account;
      const usernames = process.env.IG_USERNAMES?.split(',') || [];
      const passwords = process.env.IG_PASSWORDS?.split(',') || [];
      const index = usernames.findIndex(u => u === username);
      const password = passwords[index] || '';
      await this.ig.account.login(username, password);
      const session = await this.ig.state.serialize();
      account.session = session;
      account.lastLogin = new Date();
      await account.save();
      return this.ig;
    } catch (err) {
      if (err instanceof IgCheckpointError) {
        logger.error(`Checkpoint error for ${account.username}: ${err.message}`);
      }
      throw err;
    }
  }
}
