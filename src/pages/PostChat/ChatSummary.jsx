import Link from '@/components/ui/Link';
import { useLocation } from 'react-router-dom';
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

const Pill = styled(Button)`
  & {
    border-radius: 999px; /* Pill Shape */
    padding: 2px 24px;
    margin-left: 4px;
    height: 31px;
  }
`;

const ChatSummary = () => {
  const location = useLocation();
  const { state } = location;
  const { studentContext } = useStudent();
  const [isLoading, setIsLoading] = useState(true);
  const [isLectureLoading, setIsLectureLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [overviewReport, setOverviewReport] = useState({});
  const [currentLecture, setCurrentLecture] = useState(state.lectures[0]);
  const [currentLectureReport, setCurrentLectureReport] = useState(
    state.lectures[0]
  );

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const promises = [
        getOverallReport(state.lectures),
        getStudents(),
        getLectureRport(currentLecture.id),
      ];
      const [overviewReport, students, lectureReport] = await Promise.all(
        promises
      );

      const filteredStudents = students.filter(
        (s) => s.id !== studentContext?.id
      );

      setCurrentLectureReport(lectureReport);
      setOverviewReport(overviewReport);
      setStudents(filteredStudents);
      setIsLoading(false);
    })();
  }, []);

  const handleSelectLecture = async (lecture) => {
    setIsLectureLoading(true);
    const report = await getLectureRport(lecture.id);
    setCurrentLecture(lecture);
    setCurrentLectureReport(report);
    setIsLectureLoading(false);
  };

  return isLoading ? (
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
  ) : (
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
            flexWrap: 'nowrap',
            marginTop: '8px',
          }}
        >
          {state.lectures.map((lecture) => (
            <Pill
              variant={
                lecture.topic === currentLecture.topic
                  ? 'contained'
                  : 'outlined'
              }
              key={lecture.id}
              isLoading={isLectureLoading}
              onClick={() => handleSelectLecture(lecture)}
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
        <br />
        <Link fullWidth variant="contained" to="/dashboard">
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ChatSummary;
