import ChatInput from '@/components/ui/Chat/ChatInput';
import { Typography } from '@mui/material';

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ChatRow from '@/components/ui/Chat/ChatRow';
import { useMutation } from '@tanstack/react-query';
import { generateTopics } from '@/services/api/topics';
import { useState } from 'react';
import { useStudent } from '../contexts/StudentContext';
import PillButton from '../components/ui/PillButton';
import ChatBubble from '../components/ui/Chat/ChatBubble';

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
  const { studentContext } = useStudent();

  const handleSubjectSelect = (subjectText) => {
    setError(null);
    mutation.mutate({ subjectText, studentId: studentContext?.id });
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
      <div
        style={{
          display: 'flex',
          direction: 'row',
        }}
      >
        <div
          style={{
            display: 'flex',
            direction: 'column',
            position: 'relative',
          }}
        >
          <img
            src={studentContext?.image}
            style={{
              borderRadius: 999,
              objectFit: 'contain',
              height: '150px',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <PillButton
              label="Change"
              white
              onClick={() => navigate('/select-student')}
            />
          </div>
        </div>
        <div>
          <ChatBubble message={'Hi! teacher.  Let’s study!'} />
        </div>
      </div>
    </Container>
  );
}

export default Dashboard;
