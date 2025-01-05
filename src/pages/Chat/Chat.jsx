import ChatInput from '@/components/ui/Chat/ChatInput';
import ChatRow from '@/components/ui/Chat/ChatRow';
import Link from '@/components/ui/Link';
import { getLectureMessages } from '@/services/api/lectures';

import socket from '@/services/webSocket/client';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
// import { useLocation } from 'react-router-dom';

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - ${({ theme }) => theme.sizes.headerHeight} - 96px);
  overflow: scroll;
  margin-top: ${({ theme }) => theme.sizes.headerHeight};
`;

const ChatInputWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Header = styled.header`
  height: ${({ theme }) => theme.sizes.headerHeight};
  padding: 24px 0;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: fixed;
  top: 0;
  left: 24px;
  right: 24px;
  box-sizing: border-box;
`;

const Chat = () => {
  const { state } = useLocation();

  const [incomingMessages, setIncomingMessages] = useState([]);

  useEffect(() => {
    (async function () {
      const messages = await getLectureMessages(state.lecture.id);
      setIncomingMessages(messages);
    })();
  }, [state.lecture.id]);

  useEffect(() => {
    // Connect to WebSocket
    socket.connect();

    // Event Listener for Incoming Messages
    socket.on('messageAck', (data) => {
      const { message } = data;
      setIncomingMessages((prev) => [...prev, message]);
    });

    // Handle Connection Errors
    socket.on('connect_error', (err) => {
      console.error('Connection Error:', err.message);
    });

    // Cleanup on Unmount
    return () => {
      socket.off('messageAck');
      socket.disconnect();
    };
  }, []);

  const sendMessage = (message) => {
    if (message.trim()) {
      const payload = {
        content: message,
        lecture: state.lecture.id
      }
      socket.emit('messageSubmitted', payload);
    }
  };

  return (
    <ChatWrapper>
      <Header>
        <Link to="post-chat">End Chat</Link>
      </Header>

      {incomingMessages.map((message) => (
        <ChatRow
          key={message.id}
          avatarSize="xs"
          isSender={message.sender !== 'STUDENT'}
          message={message.content}
        />
      ))}

      <ChatInputWrapper>
        <ChatInput fullWidth onSubmit={sendMessage} clearOnSubmit />
      </ChatInputWrapper>
    </ChatWrapper>
  );
};

export default Chat;
