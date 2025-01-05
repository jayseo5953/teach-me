import styled from 'styled-components';
import Avatar from '@/components/ui/Chat/Avatar';
import ChatBubble from './ChatBubble';

const ChatRowContainer = styled.div`
  display: flex;

  margin: 16px 0;
`;

const StyledAvatar = styled(Avatar)`
  ${({ variant }) => variant === 'square' && 'border-radius: 16px;'}
`;

const ChatRow = ({
  avatarSrc = '/assets/student.png',
  avatarSize,
  avatarVariant,
  isSender,
  message,
}) => {
  return (
    <ChatRowContainer>
      <StyledAvatar src={avatarSrc} size={avatarSize} variant={avatarVariant} />
      <ChatBubble sender={isSender} message={message} />
    </ChatRowContainer>
  );
};

export default ChatRow;
