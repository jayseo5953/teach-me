import { io } from 'socket.io-client';
const SOCKET_URL = import.meta.env.VITE_API_URL;

// Initialize WebSocket client
const socket = io(SOCKET_URL, {
  autoConnect: false, // Prevent auto-connect on import
  reconnection: true, // Auto-reconnect
  transports: ['websocket'], // Use WebSocket protocol explicitly
  auth: {
    userId: '677a1f33be4c699c3bc402b9', // 여기에 유저 아이디 들어가야함
  },
});

export default socket;
