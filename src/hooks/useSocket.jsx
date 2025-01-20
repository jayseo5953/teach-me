import { useEffect, useState } from 'react';
import createSocket from '@/services/webSocket/client';

const useSocket = (userId, socketId, handler) => {
  const [socket, setSocket] = useState(userId);

  useEffect(() => {
    if (userId) {
      const newSocket = createSocket(userId);
      setSocket(newSocket);

      newSocket.connect();
      newSocket.on(socketId, handler);

      // Handle Connection Errors
      newSocket.on('connect_error', (err) => {
        console.error('Connection Error:', err.message);
      });

      // Cleanup on Unmount
      return () => {
        newSocket.off(socketId);
        newSocket.disconnect();
      };
    }
  }, [userId, socketId, handler]);

  return [socket];
};

export default useSocket;
