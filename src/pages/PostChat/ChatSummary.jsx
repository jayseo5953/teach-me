import Link from '@/components/ui/Link';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStudent } from '@/contexts/StudentContext';
import ChatBubble from '@/components/ui/Chat/ChatBubble';
import { Box, Typography } from '@mui/material';
import OverallLectureReport from '@/components/OverallLectureReport';
import { useState } from 'react';
import { getLectureRport, getOverallReport } from '@/services/api/reports';
import { getStudents } from '@/services/api/students';
import LectureReport from '@/components/LectureReport';
import AnswerCorrectnessCard from '@/components/AnswerCorrectnessCard';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useQueries } from '@tanstack/react-query';
import {
  SpacedBox,
  CenteredBox,
  CenteredSpacedBox,
} from '@/components/styled/Boxes';
import StudentCard from '@/components/StudentCard';
import PillButton from '@/components/ui/PillButton';
import Sheet from '@/components/ui/Sheet';
import styled from 'styled-components';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorScreen from '@/components/ErrorScreen';

const BookMarkWrapper = styled(CenteredBox)`
  width: 32px;
  height: 32px;
  background-color: #f5f5f5;
  border-radius: 50%;
`;
const BookMarkIcon = () => (
  <BookMarkWrapper>
    <svg viewBox="0 0 24 24" width="24" height="24" fill="red">
      <path d="M17 3H7a2 2 0 0 0-2 2v14l6-3.75L17 19V5a2 2 0 0 0-2-2z" />
    </svg>
  </BookMarkWrapper>
);

const ChatSummary = () => {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const { student, setStudent } = useStudent();
  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);

  const results = useQueries({
    queries: [
      {
        queryKey: ['overallReport'],
        queryFn: () => getOverallReport(state?.lectures),
        staleTime: Infinity,
        retry: false,
      },
      {
        queryKey: ['students', state?.students],
        queryFn: getStudents,
        staleTime: Infinity,
      },
      ...state.lectures.map((lecture) => ({
        queryKey: ['lectureReport', lecture.id],
        queryFn: () => getLectureRport(lecture.id),
        staleTime: Infinity,
      })),
    ],
  });

  const [overviewReport, students, ...lectureReports] = results.map(
    (result) => result.data
  );
  const currentLecture = state.lectures[currentLectureIndex];
  const currentLectureReport = lectureReports[currentLectureIndex];
  const isLoading = results.some((result) => result.isLoading);
  const failedQueries = results.filter((result) => result.isError);

  const retryFailedQueries = () => {
    failedQueries.forEach((query) => {
      query.refetch();
    });
  };

  const handleSelectStudent = (student) => {
    setStudent(student);
    navigate('/dashboard');
  };

  if (isLoading) {
    return <LoadingScreen message={'Generating final report...'} />;
  }

  if (failedQueries.length) {
    return <ErrorScreen onRetry={retryFailedQueries} />;
  }

  return (
    <div>
      <SpacedBox display={'flex'} flexDirection={'row'} width={'100%'}>
        <img
          src={student?.image}
          style={{
            borderRadius: 12,
            objectFit: 'contain',
            height: '72px',
          }}
        />

        <ChatBubble
          message={`I learned a lot about ${state.subject}! Thanks! ❤️`}
        />
      </SpacedBox>

      <SpacedBox>
        <OverallLectureReport report={overviewReport} student={student} />
      </SpacedBox>
      <SpacedBox>
        <LectureReport
          lecture={currentLecture}
          report={currentLectureReport}
          student={student}
        />
      </SpacedBox>

      <CenteredSpacedBox flexDirection={'column'} style={{ marginTop: '16px' }}>
        <Typography variant="caption1" color="primary">
          Select a topic to view a topic report
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '8px',
          }}
        >
          {state.lectures.map((lecture, index) => (
            <PillButton
              variant={
                lecture.topic === currentLecture.topic
                  ? 'contained'
                  : 'outlined'
              }
              selected={lecture.topic === currentLecture.topic}
              key={lecture.id}
              onClick={() => setCurrentLectureIndex(index)}
              label={lecture.topic}
            />
          ))}
        </Box>
      </CenteredSpacedBox>

      <SpacedBox>
        <Typography variant="h3">Try with other students</Typography>
        <Box marginTop={'8px'} display={'flex'} flexDirection={'row'}>
          {students.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onClick={() => handleSelectStudent(student)}
              type="secondary"
            />
          ))}
        </Box>
      </SpacedBox>

      <SpacedBox>
        <Typography variant="h3" marginBottom="8px">
          Summary
        </Typography>
        <AnswerCorrectnessCard
          percentage={overviewReport?.correctAnswerRate?.rate}
        />
      </SpacedBox>
      <SpacedBox>
        <Sheet isFullWidth onClick={() => navigate('review', { state })}>
          <Box display={'flex'} justifyContent="space-between">
            <CenteredBox>
              <BookMarkIcon />
              <Typography marginLeft="8px">Review the lecture</Typography>
            </CenteredBox>
            <div>
              <ChevronRightIcon />
            </div>
          </Box>
        </Sheet>
      </SpacedBox>

      <SpacedBox>
        <Link fullWidth variant="contained" to="/dashboard">
          Return to Dashboard
        </Link>
      </SpacedBox>
      <br />
    </div>
  );
};

export default ChatSummary;
