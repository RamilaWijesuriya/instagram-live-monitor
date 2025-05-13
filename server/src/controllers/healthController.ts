import { Request, Response } from 'express';

export const healthCheck = (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date(),
  });
};
// No ESM import adjustments needed here
