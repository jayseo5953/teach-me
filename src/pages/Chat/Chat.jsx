import ChatInput from '@/components/ui/Chat/ChatInput';
import ChatRow from '@/components/ui/Chat/ChatRow';
import { createLecture, getLectureMessages } from '@/services/api/lectures';
import LinearProgress from '@mui/material/LinearProgress';
import createSocket from '@/services/webSocket/client';
import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Box, Chip, IconButton, Popover, Typography } from '@mui/material';
import { ArrowDownward, CheckCircle } from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';
import ConfirmationModal from '@/components/ConfirmationModal';
import Button from '@/components/ui/Button';
import { useStudent } from '@/contexts/StudentContext';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { getHint } from '../../services/api/hints';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import FinishedChatModal from '@/components/FinishedChatModal';

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

const requiredSatisfactionCount = 2;

const Chat = () => {
  const { state } = useLocation();
  const { selectedTopics, lecture, subject } = state || {};
  const [incomingMessages, setIncomingMessages] = useState([]);
  const [lectures, setLectures] = useState([lecture]);
  const [satisfactionCount, setSatisfactionCount] = useState(0);
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const [currentLecture, setCurrentLecture] = useState(lecture);
  const [remainingTopics, setRemainingTopics] = useState(selectedTopics);
  const [isFinished, setIsFinished] = useState(false);
  const [socket, setSocket] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showFinished, setShowFinished] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { studentContext } = useStudent();
  const [anchorEl, setAnchorEl] = useState(null);
  const [hint, setHint] = useState('');
  const [hintLoading, setHintLoading] = useState(true);

  /* Refs */
  const bottomRef = useRef(null);
  const containerRef = useRef(null);

  /* Calculated Variables */
  const progress = (satisfactionCount / requiredSatisfactionCount) * 100;
  const currentTopic = remainingTopics[0];

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

  const handleClick = async (event) => {
    setAnchorEl(event.currentTarget);

    setHintLoading(true);
    const filterStudentQuestions = incomingMessages.filter(
      (m) => m.sender === 'STUDENT'
    );
    const lastQuestion =
      filterStudentQuestions[filterStudentQuestions.length - 1];

    const hint = await getHint(lastQuestion.content);

    setHint(hint);
    setHintLoading(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleUseHint = (hint) => {
  //   sendMessage(hint);
  //   handleClose();
  // };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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

  useEffect(() => {
    if (isFinished) {
      setSatisfactionCount(requiredSatisfactionCount);
      setRemainingTopics([]);
    }
  }, [isFinished]);

  useEffect(() => {
    if (!user) {
      return;
    }
    const _socket = createSocket(user.id);
    setSocket(_socket);
    _socket.connect();
    _socket.on('messageAck', async (data) => {
      const { message, isSatisfactory } = data;

      if (isSatisfactory) {
        if (satisfactionCount + 1 >= requiredSatisfactionCount) {
          if (remainingTopics.length === 1) {
            return setIsFinished(true);
          }
          const lecture = await createLecture({
            subject,
            topic: remainingTopics[1],
            userId: user.id,
            studentId: studentContext.id,
          });

          setCurrentLecture(lecture);
          setLectures([...lectures, lecture]);
          setSatisfactionCount(0);
          setRemainingTopics((prev) =>
            prev.filter((topic) => topic !== currentTopic)
          );
        } else {
          setSatisfactionCount((prev) => prev + 1);
          setIncomingMessages((prev) => [...prev, message]);
        }
      } else {
        setIncomingMessages((prev) => [...prev, message]);
      }
    });

    // Handle Connection Errors
    _socket.on('connect_error', (err) => {
      console.error('Connection Error:', err.message);
    });

    // Cleanup on Unmount
    return () => {
      _socket.off('messageAck');
      _socket.disconnect();
    };
  }, [remainingTopics, lecture, satisfactionCount, user]);

  const confirmationTexts = selectedTopics.map((topic) => ({
    text: topic,
    finished: !remainingTopics.includes(topic),
  }));

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
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h3">Topic: {currentTopic}</Typography>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Button
                onClick={async (e) => await handleClick(e)}
                variant="primary"
                startIcon={<HelpOutlineIcon />}
                sx={{ backgroundColor: 'primary.95', color: 'primary.dark' }}
                style={{ padding: '4px 12px' }}
              >
                Hint
              </Button>
              <StyledPopover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <div
                  style={{
                    padding: '24px',
                    background: '#fff',
                  }}
                >
                  {hintLoading ? (
                    <LoadingSpinner />
                  ) : (
                    <Box>
                      <Typography>{hint}</Typography>
                      {/* <Button
                        sx={{ margin: 'auto', display: 'block' }}
                        onClick={() => handleUseHint(hint)}
                      >
                        Use this hint
                      </Button> */}
                    </Box>
                  )}
                </div>
              </StyledPopover>
            </div>
          </div>
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
