import ChatInput from '@/components/ui/Chat/ChatInput';
import ChatRow from '@/components/ui/Chat/ChatRow';
import { createLecture, getLectureMessages } from '@/services/api/lectures';
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Box, Chip, IconButton, Popover, Typography } from '@mui/material';
import { ArrowDownward, CheckCircle } from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';
import ConfirmationModal from '@/components/ConfirmationModal';
import Button from '@/components/ui/Button';
import { useStudent } from '@/contexts/StudentContext';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { getHint } from '@/services/api/hints';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import FinishedChatModal from '@/components/FinishedChatModal';
import useSocket from '@/hooks/useSocket';

const headerHeight = '170px';

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - ${headerHeight} - 96px);
  overflow: scroll;
  margin-top: ${headerHeight};
  padding-top: 8px;
`;

const ChatInputWrapper = styled.div`
  position: fixed;
  left: 24px;
  right: 24px;
  bottom: 24px;
  max-width: 735px;
  margin: auto;
`;

const Header = styled.header`
  height: ${headerHeight};
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 24px;
  right: 24px;
  box-sizing: border-box;
  max-width: 735px;
  margin: auto;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

const TopicPill = styled(Chip)`
  margin-right: 4px;
  height: 28px;
`;

const ScrollToBottomButton = styled(IconButton)`
  position: fixed;
  bottom: 85px;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;

  &,
  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.main};
  }
`;

const StyledPopover = styled(Popover)`
  && .MuiPaper-root {
    border-radius: 32px;
    margin-right: 24px;
  }
`;

const RequiredSatisfactionCount = 2;
const ChatWebSocketId = 'messageAck';

// TODO: use masked chat id in the url so that user can pick up chat on another session
const Chat = () => {
  const { state } = useLocation();
  const { selectedTopics, lecture, subject } = state || {};
  const [incomingMessages, setIncomingMessages] = useState([]);
  const [lectures, setLectures] = useState([lecture]);
  const [satisfactionCount, setSatisfactionCount] = useState(0);
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const [currentLecture, setCurrentLecture] = useState(lecture);
  const [remainingTopics, setRemainingTopics] = useState(selectedTopics);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showFinished, setShowFinished] = useState(false);
  const [hintEl, setHintEl] = useState(null);
  const [hint, setHint] = useState('');
  const [hintLoading, setHintLoading] = useState(true);

  const { user } = useAuth();
  const navigate = useNavigate();
  const { student } = useStudent();

  /* Refs */
  const bottomRef = useRef(null);
  const containerRef = useRef(null);

  /* Calculated Variables */
  const currentTopic = remainingTopics[0];
  const isFinished = !remainingTopics.length;
  const progress = isFinished
    ? 100
    : (satisfactionCount / RequiredSatisfactionCount) * 100;
  const confirmationTexts = selectedTopics.map((topic) => ({
    text: topic,
    finished: !remainingTopics.includes(topic),
  }));

  /* Handlers */
  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      setIsScrolledUp(
        container.scrollHeight - container.scrollTop >
          container.clientHeight + 200
      );
    }
  };

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const sendMessage = (message) => {
    if (message.trim()) {
      const payload = {
        content: message,
        lecture: currentLecture.id,
      };
      socket.emit('messageSubmitted', payload);
    }
  };

  const handleOpenHint = async (event) => {
    setHintEl(event.currentTarget);
    setHintLoading(true);
    const questions = incomingMessages.filter((m) => m.sender === 'STUDENT');
    const lastQuestion = questions[questions.length - 1];

    const hint = await getHint(lastQuestion.content);

    setHint(hint);
    setHintLoading(false);
  };
  const handleHintClose = () => {
    setHintEl(null);
  };

  const proceedToNextTopic = useCallback(async () => {
    const lecture = await createLecture({
      subject,
      topic: remainingTopics[1],
      userId: user.id,
      studentId: student.id,
    });

    setCurrentLecture(lecture);
    setLectures((prev) => [...prev, lecture]);
    setSatisfactionCount(0); // Reset satisfaction count
  }, [subject, remainingTopics, user.id, student.id]);

  /* UseEffect */
  useEffect(() => {
    const container = containerRef.current;
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [incomingMessages]);

  useEffect(() => {
    (async function () {
      const messages = await getLectureMessages(currentLecture.id);
      setIncomingMessages(messages);
    })();
  }, [currentLecture.id]);

  const socketHandler = useCallback(
    async (data) => {
      const { message, isSatisfactory } = data;

      if (!isSatisfactory) {
        return setIncomingMessages((prev) => [...prev, message]);
      }

      if (satisfactionCount === RequiredSatisfactionCount - 1) {
        if (remainingTopics.length > 1) await proceedToNextTopic();
        setRemainingTopics((prev) =>
          prev.filter((topic) => topic !== currentTopic)
        );
      } else {
        setSatisfactionCount((prev) => prev + 1);
        setIncomingMessages((prev) => [...prev, message]);
      }
    },
    [
      satisfactionCount,
      remainingTopics.length,
      proceedToNextTopic,
      currentTopic,
    ]
  );
  const [socket] = useSocket(user.id, ChatWebSocketId, socketHandler);

  return (
    <ChatWrapper ref={containerRef}>
      {showConfirmation && (
        <ConfirmationModal
          topics={confirmationTexts}
          onCancel={() => setShowConfirmation(false)}
          onConfirm={() => {
            navigate('/');
          }}
        />
      )}
      {showFinished && (
        <FinishedChatModal
          subject={subject}
          onConfirm={() =>
            navigate('post-chat', { state: { ...state, lectures } })
          }
        />
      )}
      <Header>
        <Nav>
          <Button onClick={() => setShowConfirmation(true)}>End Chat</Button>
        </Nav>
        <div>
          <Box
            sx={{
              maxWidth: '100%',
              overflow: 'scroll',
              maxHeight: '45px',
              display: 'flex',
              flexWrap: 'nowrap',
            }}
          >
            {selectedTopics.map((topic) => (
              <TopicPill
                key={topic}
                label={topic}
                color={
                  remainingTopics.includes(topic) && currentTopic !== topic
                    ? ''
                    : 'primary'
                }
                icon={!remainingTopics.includes(topic) && <CheckCircle />}
              />
            ))}
          </Box>

          <Box
            sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              marginTop: '10px',
            }}
          >
            <Typography
              variant="caption"
              color="primary"
              sx={{ marginRight: '10px' }}
            >
              Progress
            </Typography>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ flex: 1 }}
            />
          </Box>

          <br />
          <Box
            display={'flex'}
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Typography variant="h3">Topic: {currentTopic}</Typography>
            <Box display={'flex'} alignItems={'center'}>
              <Button
                variant="contained"
                onClick={handleOpenHint}
                startIcon={<HelpOutlineIcon />}
                sx={{ backgroundColor: 'primary.95', color: 'primary.dark' }}
                style={{ padding: '4px 12px' }}
              >
                Hint
              </Button>
              <StyledPopover
                id={hintEl && 'simple-popover'}
                open={!!hintEl}
                anchorEl={hintEl}
                onClose={handleHintClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Box padding={'24px'} backgroundColor={'#fff'}>
                  {hintLoading ? (
                    <LoadingSpinner />
                  ) : (
                    <Box>
                      <Typography>{hint}</Typography>
                    </Box>
                  )}
                </Box>
              </StyledPopover>
            </Box>
          </Box>
        </div>
      </Header>

      {incomingMessages.map((message) => (
        <ChatRow
          key={message.id}
          avatarSize="xs"
          isSender={message.sender !== 'STUDENT'}
          message={message.content}
        />
      ))}
      {isScrolledUp && (
        <ScrollToBottomButton onClick={() => scrollToBottom()}>
          <ArrowDownward />
        </ScrollToBottomButton>
      )}
      <div ref={bottomRef} />
      <ChatInputWrapper>
        {isFinished ? (
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              setShowFinished(true);
            }}
          >
            Finish Chat
          </Button>
        ) : (
          <ChatInput
            minRows={1}
            maxRows={5}
            rows={null}
            fullWidth
            onSubmit={sendMessage}
            clearOnSubmit
          />
        )}
      </ChatInputWrapper>
    </ChatWrapper>
  );
};

export default Chat;
