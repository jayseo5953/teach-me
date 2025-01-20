import Link from '@/components/ui/Link';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStudent } from '@/contexts/StudentContext';
import ChatBubble from '@/components/ui/Chat/ChatBubble';
import { Box, Typography } from '@mui/material';
import OverallLectureReport from '@/components/OverallLectureReport';
import { useState } from 'react';
import { getLectureRport, getOverallReport } from '@/services/api/reports';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { getStudents } from '@/services/api/students';
import SecondaryStudentCard from '@/components/SecondaryStudentCard';
import LectureReport from '@/components/LectureReport';
import Button from '@/components/ui/Button';
import styled from 'styled-components';
import AnswerCorrectnessCard from '@/components/AnswerCorrectnessCard';
import ReviewCard from '@/components/ReviewCard';
import { useQueries } from '@tanstack/react-query';
import {
  SpacedBox,
  CenteredBox,
  CenteredSpacedBox,
} from '@/components/styled/Boxes';

const Pill = styled(Button)`
  & {
    border-radius: 999px; /* Pill Shape */
    padding: 2px 24px;
    margin-left: 4px;
    height: 31px;
    white-space: nowrap;
    margin-bottom: 4px;
  }
`;

const ChatSummary = () => {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const { student } = useStudent();
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

  if (isLoading) {
    return (
      <CenteredBox height={'70vh'} flexDirection={'column'}>
        <div>
          <LoadingSpinner />
          <Typography variant="h4" textAlign={'center'} fontWeight={500}>
            Generating final report...
          </Typography>
        </div>
      </CenteredBox>
    );
  }

  if (failedQueries.length) {
    return (
      <CenteredBox height={'70vh'}>
        <div>
          <div
            style={{
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" fontWeight={500}>
              Sorry, something went wrong.
            </Typography>
            <Button onClick={retryFailedQueries}>Try again</Button>
          </div>
        </div>
      </CenteredBox>
    );
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

      <CenteredSpacedBox flexDirection={'column'} style={{ marginTop: '8px' }}>
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
            <Pill
              variant={
                lecture.topic === currentLecture.topic
                  ? 'contained'
                  : 'outlined'
              }
              key={lecture.id}
              onClick={() => setCurrentLectureIndex(index)}
            >
              {lecture.topic}
            </Pill>
          ))}
        </Box>
      </CenteredSpacedBox>

      <SpacedBox>
        <Typography variant="h3">Try with other students</Typography>
        <Box marginTop={'8px'} display={'flex'} flexDirection={'row'}>
          {students.map((student) => (
            <SecondaryStudentCard key={student.id} student={student} />
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
        <ReviewCard onClick={() => navigate('review', { state })} />
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
