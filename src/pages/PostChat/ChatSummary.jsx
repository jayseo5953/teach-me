import Link from '@/components/ui/Link';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStudent } from '@/contexts/StudentContext';
import ChatBubble from '../../components/ui/Chat/ChatBubble';
import { Box, Typography } from '@mui/material';
import OverallLectureReport from '../../components/ui/OverallLectureReport';
import { useEffect, useState } from 'react';
import { getLectureRport, getOverallReport } from '../../services/api/reports';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { getStudents } from '../../services/api/students';
import SecondaryStudentCard from '../../components/ui/SecondaryStudentCard';
import LectureReport from '@/components/ui/LectureReport';
import Button from '@/components/ui/Button';
import styled from 'styled-components';
import AnswerCorrectnessCard from '../../components/AnswerCorrectnessCard';
import ReviewCard from '../../components/ui/ReviewCard';

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
  const { studentContext } = useStudent();
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [currentLecture, setCurrentLecture] = useState(state.lectures[0]);

  const [students, setStudents] = useState(state.students || []);
  const [overviewReport, setOverviewReport] = useState(
    state.overviewReport || {}
  );
  const [lectureReports, setLectureReports] = useState(
    state.lectureReports || []
  );
  const [currentLectureReport, setCurrentLectureReport] = useState(
    lectureReports[0]
  );

  const fetchData = async () => {
    try {
      setFetchError(false);
      setIsLoading(true);
      const promises = [
        getOverallReport(state?.lectures),
        getStudents(),
        ...state.lectures.map((lecture) => getLectureRport(lecture.id)),
      ];
      const [overviewReport, students, ...lectureReports] = await Promise.all(
        promises
      );

      const filteredStudents = students.filter(
        (s) => s.id !== studentContext?.id
      );

      setLectureReports(lectureReports);
      setCurrentLectureReport(lectureReports[0]);
      setOverviewReport(overviewReport);
      setStudents(filteredStudents);

      navigate('.', {
        state: {
          ...location.state,
          students,
          overviewReport,
          lectureReports,
          currentLectureReport,
        },
        replace: true,
      });
    } catch (e) {
      setFetchError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    //data is already loaded from location state
    if (currentLectureReport) {
      return setIsLoading(false);
    } else {
      fetchData();
    }
  }, []);

  const handleSelectLecture = async (index) => {
    setCurrentLecture(state.lectures[index]);
    setCurrentLectureReport(lectureReports[index]);
  };

  if (isLoading) {
    return (
      <Box
        height={'70vh'}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
      >
        <div>
          <LoadingSpinner />
          <div
            style={{
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" fontWeight={500}>
              Generating final report...
            </Typography>
          </div>
        </div>
      </Box>
    );
  }

  if (fetchError) {
    return (
      <Box
        height={'70vh'}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
      >
        <div>
          <div
            style={{
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" fontWeight={500}>
              Sorry, something went wrong.
            </Typography>
            <Button onClick={fetchData}>Try again</Button>
          </div>
        </div>
      </Box>
    );
  }

  return (
    <div>
      <br />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
        }}
      >
        <img
          src={studentContext?.image}
          style={{
            borderRadius: 12,
            objectFit: 'contain',
            height: '72px',
          }}
        />
        <div
          style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
        >
          <ChatBubble
            message={`I learned a lot about ${state.subject}! Thanks! ❤️`}
          />
        </div>
      </div>
      <div style={{ marginTop: '24px' }}>
        <OverallLectureReport
          report={overviewReport}
          student={studentContext}
        />
      </div>
      <div style={{ marginTop: '24px' }}>
        <LectureReport
          lecture={currentLecture}
          report={currentLectureReport}
          student={studentContext}
        />
      </div>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '4px',
        }}
      >
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
              onClick={() => handleSelectLecture(index)}
            >
              {lecture.topic}
            </Pill>
          ))}
        </Box>
      </Box>
      <div style={{ marginTop: '24px' }}>
        <Typography variant="h3">Try with other students</Typography>
        <div
          style={{
            marginTop: '8px',
            display: 'flex',
            flexDirection: 'row',
            marginRight: '-16px',
          }}
        >
          {students.map((student) => (
            <SecondaryStudentCard key={student.id} student={student} />
          ))}
        </div>
      </div>
      <div style={{ paddingBottom: '24px' }}>
        <div style={{ marginTop: '24px' }}>
          <Typography variant="h3" marginBottom="8px">
            Summary
          </Typography>
          <AnswerCorrectnessCard
            percentage={overviewReport?.correctAnswerRate?.rate}
          />
        </div>
        <div style={{ marginTop: '24px' }}>
          <ReviewCard onClick={() => navigate('review', { state })} />
        </div>
        <br />
        <Link fullWidth variant="contained" to="/dashboard">
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ChatSummary;
