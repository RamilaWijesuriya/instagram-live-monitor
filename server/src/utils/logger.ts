import { createLogger, format, transports } from 'winston';
import path from 'path';

const logDir = path.resolve('logs');
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level}] ${message}`)
  ),
  transports: [
    new transports.Console({ level: 'warn' }),
    new transports.File({ filename: path.join(logDir, 'errors.log'), level: 'error' })
  ]
});

export default logger;
