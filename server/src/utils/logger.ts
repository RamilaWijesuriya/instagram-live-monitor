import { createLogger, transports, format } from 'winston';
import { LOG_LEVEL } from '../config.js';

const logger = createLogger({
  level: LOG_LEVEL,
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level}] ${message}`)
  ),
  transports: [new transports.Console()],
});

export default logger;
