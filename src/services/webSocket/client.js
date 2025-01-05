import { io } from 'socket.io-client';
const SOCKET_URL = import.meta.env.VITE_API_URL;

// Initialize WebSocket client
const socket = io(SOCKET_URL, {
  autoConnect: false, // Prevent auto-connect on import
  reconnection: true, // Auto-reconnect
  transports: ['websocket'], // Use WebSocket protocol explicitly
});

export default socket;
