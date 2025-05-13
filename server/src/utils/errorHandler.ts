import { Request, Response, NextFunction } from 'express';
import logger from './logger';
import { Socket } from 'socket.io';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  logger.error(err.stack || err.message);
  res.status(500).json({ error: 'Internal server error' });
}

export function wrapWebSocketHandler(handler: (socket: Socket) => Promise<void>) {
  return async (socket: Socket) => {
    try {
      await handler(socket);
    } catch (err) {
      logger.error(`WebSocket error: ${err.message}`);
    }
  };
}
