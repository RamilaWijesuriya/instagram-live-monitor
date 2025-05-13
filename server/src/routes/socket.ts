import { Server, Socket } from 'socket.io';
import logger from '../utils/logger.js';

export default function socketRouter(io: Server) {
  io.on('connection', (socket: Socket) => {
    logger.info(`WebSocket client connected: ${socket.id}`);

    // Subscribe to account-specific stream events
    socket.on('subscribe', (account: string) => {
      socket.join(account);
      logger.info(`Socket ${socket.id} subscribed to ${account}`);
    });

    socket.on('unsubscribe', (account: string) => {
      socket.leave(account);
      logger.info(`Socket ${socket.id} unsubscribed from ${account}`);
    });

    socket.on('disconnect', () => {
      logger.info(`WebSocket client disconnected: ${socket.id}`);
    });
  });
}
