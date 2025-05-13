import { Request, Response, NextFunction } from 'express';
import StreamModel from '../models/Stream.js';

export const listStreams = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const streams = await StreamModel.find().sort({ startTime: -1 });
    res.json(streams);
  } catch (err) {
    next(err);
  }
};

export const getStreamsByAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username } = req.params;
    const streams = await StreamModel.find({ account: username }).sort({ startTime: -1 });
    res.json(streams);
  } catch (err) {
    next(err);
  }
};

export const listActiveStreams = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const streams = await StreamModel.find({ isActive: true }).sort({ startTime: -1 });
    res.json(streams);
  } catch (err) {
    next(err);
  }
};

export const getStreamById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const stream = await StreamModel.findById(id);
    if (!stream) return res.status(404).json({ message: 'Stream not found' });
    res.json(stream);
  } catch (err) {
    next(err);
  }
};
