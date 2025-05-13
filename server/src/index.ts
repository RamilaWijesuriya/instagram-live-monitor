import mongoose from 'mongoose';
import process from 'process';
import { server, io } from './app.js';
import logger from './utils/logger.js';
import { PORT, MONGO_URI } from './config.js';
import InstagramService from './services/instagram/InstagramService.js';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    logger.info('Connected to MongoDB');
    // Start Instagram polling service
    const instagramService = new InstagramService(io);
    instagramService.start();
    // Start server
    server.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  })
  .catch((err: Error) => logger.error(`MongoDB connection error: ${err.message}`));

process.on('SIGINT', () => {
  logger.info('Shutting down server...');
  server.close(() => process.exit(0));
});
