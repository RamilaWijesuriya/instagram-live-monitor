import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import apiRouter from './routes/api.js';
import socketRouter from './routes/socket.js';
import { errorHandler } from './utils/errorHandler.js';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: '*' }
});

app.use(cors());
app.use(express.json());

// REST API
app.use('/api', apiRouter);

// WebSocket
socketRouter(io);

// Error handler
app.use(errorHandler);

export { server, io };
export default app;
