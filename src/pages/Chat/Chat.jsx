import ChatInput from '@/components/ui/Chat/ChatInput';
import Link from '@/components/ui/Link';
import socket from '@/services/webSocket/client';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
// import { useLocation } from 'react-router-dom';

const ChatInputWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Chat = () => {
  //   const { state } = useLocation();

  const [message, setMessage] = useState('');
  const [incomingMessages, setIncomingMessages] = useState([]);

  useEffect(() => {
    // Connect to WebSocket
    socket.connect();

    // Event Listener for Incoming Messages
    socket.on('message', (data) => {
      setIncomingMessages((prev) => [...prev, data]);
    });

    // Handle Connection Errors
    socket.on('connect_error', (err) => {
      console.error('Connection Error:', err.message);
    });

    // Cleanup on Unmount
    return () => {
      socket.off('message');
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('message', message);
      setMessage('');
    }
  };

  return (
    <div>
      Chat
      <div>
        <Link to="post-chat">Finish Chat</Link>
      </div>
      <ChatInputWrapper>
        <ChatInput fullWidth />
      </ChatInputWrapper>
    </div>
  );
};

export default Chat;
