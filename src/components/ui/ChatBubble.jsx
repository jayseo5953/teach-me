import React from 'react';
import { Box, Typography } from '@mui/material';
import styled from 'styled-components';

// Chat Bubble Styles
const ChatBubbleContainer = styled(Box)`
  position: relative;
  max-width: 60%;
  padding: 8px 12px;
  margin: 16px;
  border-radius: 12px;
  color: ${({ theme }) => theme.palette.chatBubbles.textColor};
  background-color: ${({ sender, theme }) =>
    sender
      ? theme.palette.chatBubbles.sender.backgroundColor
      : theme.palette.chatBubbles.receiver.backgroundColor};
  align-self: ${(props) => (props.sender ? 'flex-end' : 'flex-start')};

  /* Tail Styling */
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: ${(props) =>
      props.sender ? '8px 0 8px 8px' : '8px 8px 8px 0'};
    border-color: ${({ sender, theme }) =>
      sender
        ? `transparent transparent transparent ${theme.palette.chatBubbles.sender.backgroundColor}`
        : `transparent ${theme.palette.chatBubbles.receiver.backgroundColor} transparent transparent`};
    top: 50%;
    transform: translateY(50%);
    ${(props) => (props.sender ? 'right: -8px;' : 'left: -8px;')}
  }
`;

// Chat Bubble Component
function ChatBubble({ message, sender = false }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: sender ? 'flex-end' : 'flex-start',
      }}
    >
      <ChatBubbleContainer sender={sender}>
        <Typography variant="body2">{message}</Typography>
      </ChatBubbleContainer>
    </Box>
  );
}

export default ChatBubble;
