import Input from '@/components/ui/Input';

import { Typography } from '@mui/material';
import Avatar from '@/components/ui/Avatar';
import styled from 'styled-components';
import ChatBubble from '@/components/ui/ChatBubble';

const Title = styled.div`
  margin-bottom: 32px;
`;

const AvatarContainer = styled.div`
  display: flex;
  margin-top: 96px;
`;

const SquareAvatar = styled(Avatar)`
  & {
    border-radius: 16px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: ${({ theme }) => theme.sizes.fullHeight};
  position: relative;
  top: -50px;
`;

function Dashboard() {
  const handleSubjectSelect = (subject) => {};
  return (
    <Container>
      <Title>
        <Typography variant="h1">What should we study today?</Typography>
      </Title>
      <Input
        fullWidth
        placeholder="Quick search the subject"
        onSubmit={handleSubjectSelect}
      />
      <AvatarContainer>
        <SquareAvatar src="/assets/student.png" size="md" />
        <ChatBubble message="Hi teacher. Let's study!" />
      </AvatarContainer>
    </Container>
  );
}

export default Dashboard;
