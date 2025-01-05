import ChatBubble from '@/components/ui/Chat/ChatBubble';
import ChatRow from '@/components/ui/Chat/ChatRow';
import Link from '@/components/ui/Link';
import PillButton from '@/components/ui/PillButton';
import Sheet from '@/components/ui/Sheet';
import { Typography } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

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
  display: grid;
  margin-top: 16px;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
`;

const topics = [
  'topic1',
  'topic2',
  'topic3',
  'topic4',
  'topic5',
  'topic6',
  'topic7',
  'topic8',
  'topic9',
  'topic10',
  'topic11',
  'topic12',
];

const SelectTopic = () => {
  const [selectedTopics, setSelectedTopcis] = useState([]);
  const { state } = useLocation();
  const subject = state?.subject;

  const handleSelectTopic = (topic) => {
    const set = new Set(selectedTopics);
    if (set.has(topic)) {
      set.delete(topic);
    } else {
      set.add(topic);
    }
    setSelectedTopcis([...set]);
  };
  return (
    <Container>
      <div>
        <ChatRow
          avatarSize="xs"
          message={`That's a fantastic subject! Choose your topics that you would like to teach me today!`}
        />
        {/* <ChatBubble sender={true} message="this is me!!" /> */}
        <br />
        <Sheet isFullWidth>
          <Typography variant="h3">Choose Your topic</Typography>
          <Typography variant="body3">{subject}</Typography>
          <TopicsGrid>
            {topics.map((topic) => (
              <PillButton
                key={topic}
                selected={selectedTopics.includes(topic)}
                label={topic}
                onClick={handleSelectTopic}
              />
            ))}
          </TopicsGrid>
        </Sheet>
      </div>
      <ActionButtons>
        <Link fullWidth variant="contained" to="/chat">
          Start Chat
        </Link>
      </ActionButtons>
    </Container>
  );
};

export default SelectTopic;
