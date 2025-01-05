import ChatInput from '@/components/ui/Chat/ChatInput';
import { Typography } from '@mui/material';

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ChatRow from '@/components/ui/Chat/ChatRow';
import { useMutation } from '@tanstack/react-query';
import { generateTopics } from '@/services/api/topics';

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

  const handleSubjectSelect = (subjectText) => {
    mutation.mutate(subjectText);
  };

  const mutation = useMutation({
    mutationFn: generateTopics,
    onSuccess: (data) => {
      navigate('/pre-chat', { state: data });
    },
    // onError: (error) => {
    //   console.error('Error creating user:', error);
    // },
  });

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
          isLoading={mutation.isPending}
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
