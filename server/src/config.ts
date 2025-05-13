// Using a dynamic import for dotenv to avoid ESM issues
import * as dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

// Set Mongoose strictQuery option to suppress deprecation warning
mongoose.set('strictQuery', true);

export const PORT = process.env.PORT || 5000;
export const MONGO_URI = process.env.MONGO_URI || '';
export const SESSION_SECRET = process.env.SESSION_SECRET || '';
export const IG_USERNAMES = process.env.IG_USERNAMES?.split(',') || [];
export const IG_PASSWORDS = process.env.IG_PASSWORDS?.split(',') || [];
export const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
export const POLL_INTERVAL_MS = Number(process.env.POLL_INTERVAL_MS) || 30000;
export const CONCURRENCY = Number(process.env.CONCURRENCY) || IG_USERNAMES.length;
