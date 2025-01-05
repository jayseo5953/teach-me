import ChatRow from '@/components/ui/Chat/ChatRow';

import PillButton from '@/components/ui/PillButton';
import Sheet from '@/components/ui/Sheet';
import { Typography } from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Button from '@/components/ui/Button';
import { createLecture } from '@/services/api/lectures';
import { useMutation } from '@tanstack/react-query';
import { useStudent } from '@/contexts/StudentContext';
import { useAuth } from '@/contexts/AuthContext';

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 24px 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: ${({ theme }) => theme.sizes.fullHeight};
`;

const TopicsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
`;

const ViewMoreButton = styled(Button)`
  padding: 0;
`;

const maxTopicNumbers = 3;

const SelectTopic = () => {
  const [selectedTopics, setSelectedTopcis] = useState([]);
  const [shouldShowRest, setShouldShowRest] = useState(false);

  const navigate = useNavigate();
  const { state } = useLocation();
  const { subject, topics } = state || {};
  const { studentContext } = useStudent();
  const { user } = useAuth();

  const handleSelectTopic = (topic) => {
    let topicToSet = [...selectedTopics];
    if (topicToSet.includes(topic)) {
      topicToSet = topicToSet.filter((t) => t !== topic);
    } else {
      if (topicToSet.length >= maxTopicNumbers) {
        topicToSet = topicToSet.slice(1);
      }
      topicToSet = [...topicToSet, topic];
    }
    setSelectedTopcis(topicToSet);
  };
  const topicsToShow = shouldShowRest ? topics : topics.slice(0, 9);

  const mutation = useMutation({
    mutationFn: createLecture,
    onSuccess: (data) => {
      navigate('/chat', { state: { ...state, selectedTopics, lecture: data } });
    },
    // onError: (error) => {},
  });

  const startChat = async () => {
    const topic = selectedTopics[0];
    mutation.mutate({
      subject,
      topic,
      studentId: studentContext?.id,
      userId: user?.id,
    });
  };

  return (
    <Container>
      <div>
        <ChatRow
          avatarSize="xs"
          message={`That's a fantastic subject! Choose your topics that you would like to teach me today!`}
        />
        <br />
        <Sheet isFullWidth>
          <Typography variant="h3">Choose Your topic</Typography>
          <Typography variant="body3">{subject}</Typography>
          <TopicsGrid>
            {topicsToShow.map((topic) => (
              <PillButton
                key={topic}
                selected={selectedTopics.includes(topic)}
                label={topic}
                onClick={handleSelectTopic}
              />
            ))}
          </TopicsGrid>
          <br />

          {!shouldShowRest && (
            <ViewMoreButton
              fullWidth
              endIcon={<ArrowDownwardIcon />}
              sx={{ padding: 0 }}
              onClick={() => setShouldShowRest(true)}
            >
              View More Subjects
            </ViewMoreButton>
          )}
        </Sheet>
      </div>
      <ActionButtons>
        <Button
          fullWidth
          variant="contained"
          disabled={!selectedTopics.length}
          isLoading={mutation.isPending}
          onClick={startChat}
        >
          Start Chat
        </Button>
      </ActionButtons>
    </Container>
  );
};

export default SelectTopic;
