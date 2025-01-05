import styled from 'styled-components';
import Avatar from '@/components/ui/Chat/Avatar';
import ChatBubble from './ChatBubble';
import { useStudent } from '@/contexts/StudentContext';

const ChatRowContainer = styled.div`
  display: flex;
  justify-content: ${(props) => (props.$isSender ? 'flex-end' : 'flex-start')};
  margin: 16px 0;
  align-self: ${(props) => (props.$isSender ? 'flex-end' : 'flex-start')};
  max-width: 80%;
`;

const StyledAvatar = styled(Avatar)`
  ${({ variant }) => variant === 'square' && 'border-radius: 16px;'}
`;

const ChatRow = ({ avatarSize, avatarVariant, isSender, message }) => {
  const { studentContext } = useStudent();
  const avatarSrc = studentContext?.image;
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
