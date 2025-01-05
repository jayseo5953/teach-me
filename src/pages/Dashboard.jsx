import ChatInput from '@/components/ui/Chat/ChatInput';
import { Typography } from '@mui/material';

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ChatRow from '@/components/ui/Chat/ChatRow';

const Title = styled.div`
  margin-bottom: 32px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: ${({ theme }) => theme.sizes.fullHeight};
  position: relative;
  top: -50px;
`;
const ChatRowWrapper = styled.div`
  margin-bottom: 96px;
`;

function Dashboard() {
  const navigate = useNavigate();
  const handleSubjectSelect = (subject) => {
    navigate('/pre-chat', { state: { subject } });
  };
  return (
    <Container>
      <Title>
        <Typography variant="h1">What should we study today?</Typography>
      </Title>
      <ChatRowWrapper>
        <ChatInput
          fullWidth
          placeholder="Quick search the subject"
          onSubmit={handleSubjectSelect}
          maxLength={80}
        />
      </ChatRowWrapper>
      <ChatRow
        avatarSize="md"
        avatarVariant="square"
        message="Hi teacher. Let's study!"
      />
    </Container>
  );
}

export default Dashboard;
