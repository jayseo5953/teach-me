import ChatInput from '@/components/ui/Chat/ChatInput';
import ChatRow from '@/components/ui/Chat/ChatRow';
import Link from '@/components/ui/Link';
import { getLectureMessages } from '@/services/api/lectures';
import LinearProgress from '@mui/material/LinearProgress';
import socket from '@/services/webSocket/client';
import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Box, IconButton, Typography } from '@mui/material';
import { ArrowDownward } from '@mui/icons-material';

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

const ScrollToBottomButton = styled(IconButton)`
  position: fixed;
  bottom: 85px;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;

  &,
  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.main};
  }
`;

const Chat = () => {
  const { state } = useLocation();
  const [incomingMessages, setIncomingMessages] = useState([]);
  const [satisfactionCount, setSatisfactionCount] = useState(0);
  const bottomRef = useRef(null);
  const containerRef = useRef(null);
  const [isScrolledUp, setIsScrolledUp] = useState(false);

  // Check if the user scrolled up
  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      setIsScrolledUp(
        container.scrollHeight - container.scrollTop >
          container.clientHeight + 200
      );
    }
  };

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const container = containerRef.current;
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [incomingMessages]);

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
      const { message, isSatisfactory } = data;
      if (isSatisfactory) {
        setSatisfactionCount((prev) => prev + 1);
      }
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
        lecture: state.lecture.id,
      };
      socket.emit('messageSubmitted', payload);
    }
  };

  const progress = (satisfactionCount / state.selectedTopics.length) * 100;

  return (
    <ChatWrapper ref={containerRef}>
      <Header>
        <Box sx={{ flex: 1, marginRight: '20px', marginTop: '-10px' }}>
          <Typography variant="caption" color="primary">
            Progress
          </Typography>
          <LinearProgress variant="determinate" value={progress} />
        </Box>

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
      {isScrolledUp && (
        <ScrollToBottomButton onClick={() => scrollToBottom()}>
          <ArrowDownward />
        </ScrollToBottomButton>
      )}
      <div ref={bottomRef} />
      <ChatInputWrapper>
        <ChatInput fullWidth onSubmit={sendMessage} clearOnSubmit />
      </ChatInputWrapper>
    </ChatWrapper>
  );
};

export default Chat;
