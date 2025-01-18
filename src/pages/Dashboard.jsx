import ChatInput from '@/components/ui/Chat/ChatInput';
import { Box, Typography } from '@mui/material';

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { generateTopics } from '@/services/api/topics';
import { useEffect, useState } from 'react';
import { useStudent } from '@/contexts/StudentContext';
import PillButton from '@/components/ui/PillButton';
import ChatBubble from '@/components/ui/Chat/ChatBubble';

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

  useEffect(() => {
    if (!studentContext) {
      navigate('/select-student');
    }
  }, [studentContext, navigate]);

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
        <Box
          component="video"
          src="/assets/dashboard-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          sx={{
            width: '120px',
            height: '164px',
            margin: 'auto',
            display: 'block',
          }}
        />
        <Typography variant="h1" textAlign="center">
          What should we study today?
        </Typography>
      </Title>
      <ChatRowWrapper>
        <StyledChatInput
          fullWidth
          placeholder="Quick search the subject"
          onSubmit={handleSubjectSelect}
          rows={4}
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
