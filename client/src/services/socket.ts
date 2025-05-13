import { io, Socket } from 'socket.io-client';

// Initialize Socket.IO client
const socket: Socket = io(undefined, { path: '/socket.io' });

export default socket;
