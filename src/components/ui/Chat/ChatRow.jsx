import styled from 'styled-components';
import Avatar from '@/components/ui/Chat/Avatar';
import ChatBubble from './ChatBubble';

const ChatRowContainer = styled.div`
  display: flex;
  margin: 16px 0;
  align-self: ${(props) => (props.$isSender ? 'flex-end' : 'flex-start')};
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
    <ChatRowContainer $isSender={isSender}>
      {!isSender && (
        <StyledAvatar
          src={avatarSrc}
          size={avatarSize}
          variant={avatarVariant}
        />
      )}
      <ChatBubble isSender={isSender} message={message} />
    </ChatRowContainer>
  );
};

export default ChatRow;
