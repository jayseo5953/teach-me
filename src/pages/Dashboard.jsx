import ChatInput from '@/components/ui/Chat/ChatInput';
import { Typography } from '@mui/material';

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ChatRow from '@/components/ui/Chat/ChatRow';
import { useMutation } from '@tanstack/react-query';
import { generateTopics } from '@/services/api/topics';
import { useState } from 'react';

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
  height: 130px;
  margin-bottom: 60px;
`;

const StyledChatInput = styled(ChatInput)`
  & .MuiInputAdornment-root {
    height: 72px;
  }
`;

function Dashboard() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubjectSelect = (subjectText) => {
    setError(null);
    mutation.mutate(subjectText);
  };

  const mutation = useMutation({
    mutationFn: generateTopics,
    onSuccess: (data) => {
      navigate('/pre-chat', { state: data });
    },
    onError: () => {
      setError('Invalid subject. Please try again with a different subject.');
    },
  });

  return (
    <Container>
      <Title>
        <Typography variant="h1">What should we study today?</Typography>
      </Title>
      <ChatRowWrapper>
        <StyledChatInput
          fullWidth
          placeholder="Quick search the subject"
          onSubmit={handleSubjectSelect}
          maxLength={80}
          isLoading={mutation.isPending}
        />
        {error && (
          <div>
            <Typography
              variant="caption2"
              color="error"
              textAlign="center"
              sx={{
                display: 'inline-block',
                marginLeft: '15px',
                marginTop: '15px',
              }}
            >
              {error}
            </Typography>
          </div>
        )}
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
