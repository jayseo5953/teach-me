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

const Section = styled(Box)`
  margin-top: 24px;
`;

const CenteredBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CenteredSection = styled(CenteredBox)`
  margin-top: 24px;
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
      <Section display={'flex'} flexDirection={'row'} width={'100%'}>
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
      </Section>

      <Section>
        <OverallLectureReport report={overviewReport} student={student} />
      </Section>
      <Section>
        <LectureReport
          lecture={currentLecture}
          report={currentLectureReport}
          student={student}
        />
      </Section>

      <CenteredSection flexDirection={'column'} style={{ marginTop: '8px' }}>
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
      </CenteredSection>

      <Section>
        <Typography variant="h3">Try with other students</Typography>
        <Box marginTop={'8px'} display={'flex'} flexDirection={'row'}>
          {students.map((student) => (
            <SecondaryStudentCard key={student.id} student={student} />
          ))}
        </Box>
      </Section>

      <Section>
        <Typography variant="h3" marginBottom="8px">
          Summary
        </Typography>
        <AnswerCorrectnessCard
          percentage={overviewReport?.correctAnswerRate?.rate}
        />
      </Section>
      <Section>
        <ReviewCard onClick={() => navigate('review', { state })} />
      </Section>

      <Section>
        <Link fullWidth variant="contained" to="/dashboard">
          Return to Dashboard
        </Link>
      </Section>
      <br />
    </div>
  );
};

export default ChatSummary;
