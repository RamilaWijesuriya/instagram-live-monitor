import { Request, Response, NextFunction } from 'express';
import AccountModel from '../models/Account.js';
import logger from '../utils/logger.js';

export const getAccounts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accounts = await AccountModel.find().select('-session');
    res.json(accounts);
  } catch (err) {
    next(err);
  }
};

export const createAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, session } = req.body;
    const account = new AccountModel({ username, session: session || {}, lastLogin: new Date() });
    await account.save();
    res.status(201).json({ message: 'Account added', accountId: account._id });
  } catch (err) {
    next(err);
  }
};

export const deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await AccountModel.findByIdAndDelete(id);
    res.json({ message: 'Account deleted' });
  } catch (err) {
    next(err);
  }
};
