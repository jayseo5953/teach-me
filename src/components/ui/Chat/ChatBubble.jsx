import { Box, Typography } from '@mui/material';
import styled from 'styled-components';

// Chat Bubble Styles
const ChatBubbleContainer = styled(Box)`
  position: relative;
  max-width: 75%;
  padding: 8px 12px;
  margin-left: 16px;
  border-radius: 12px;
  color: ${({ theme }) => theme.palette.chatBubbles.textColor};
  background-color: ${({ $isSender, theme }) =>
    $isSender
      ? theme.palette.chatBubbles.sender.backgroundColor
      : theme.palette.chatBubbles.receiver.backgroundColor};

  /* Tail Styling */
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: ${({ $isSender }) =>
      $isSender ? '8px 0 8px 8px' : '8px 8px 8px 0'};
    border-color: ${({ $isSender, theme }) =>
      $isSender
        ? `transparent transparent transparent ${theme.palette.chatBubbles.sender.backgroundColor}`
        : `transparent ${theme.palette.chatBubbles.receiver.backgroundColor} transparent transparent`};
    top: 10%;
    transform: translateY(50%);
    ${({ $isSender }) => ($isSender ? 'right: -8px;' : 'left: -8px;')}
  }
`;

// Chat Bubble Component
function ChatBubble({ message, isSender = false, className }) {
  return (
    <Box className={className}>
      <ChatBubbleContainer $isSender={isSender}>
        <Typography variant="body2">{message}</Typography>
      </ChatBubbleContainer>
    </Box>
  );
}

export default ChatBubble;
