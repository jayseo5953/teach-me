import Link from '@/components/ui/Link';
import { useLocation } from 'react-router-dom';
import { useStudent } from '@/contexts/StudentContext';
import ChatBubble from '../../components/ui/Chat/ChatBubble';
import { Box, Typography } from '@mui/material';
import SummaryCard from '../../components/ui/SummaryCard';
import { useEffect, useState } from 'react';
import { getOverallReport } from '../../services/api/reports';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { getStudents } from '../../services/api/students';
import SecondaryStudentCard from '../../components/ui/SecondaryStudentCard';
import AnswerCorrectnessCard from '../../components/AnswerCorrectnessCard';
import ReviewCard from '../../components/ui/ReviewCard';

const ChatSummary = () => {
  const location = useLocation();
  const { state } = location;
  const { studentContext } = useStudent();
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [overviewReport, setOverviewReport] = useState({});
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    if (!lectures.length) {
      setLectures(state?.lectures);
    }
    (async () => {
      setIsLoading(true);
      const promises = [getOverallReport(state?.lectures), getStudents()];
      const [overviewReport, students] = await Promise.all(promises);
      const filteredStudents = students.filter(
        (s) => s.id !== studentContext?.id
      );

      setOverviewReport(overviewReport);
      setStudents(filteredStudents);
      setIsLoading(false);
    })();
  }, []);

  if (isLoading)
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

  return (
    <div>
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
          <ChatBubble message={'Got it! Thanks! ❤️'} />
        </div>
      </div>
      <div style={{ marginTop: '24px' }}>
        <SummaryCard report={overviewReport} student={studentContext} />
      </div>
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
      <div style={{ marginTop: '24px' }}>
        <Typography variant="h3">Summary</Typography>
        <AnswerCorrectnessCard
          percentage={overviewReport?.correctAnswerRate?.rate}
        />
      </div>
      <div style={{ marginTop: '24px' }}>
        <ReviewCard lectures={lectures} />
      </div>
      <div style={{ marginTop: '24px' }}>
        <Link to="/dashboard">Go home</Link>
      </div>
    </div>
  );
};

export default ChatSummary;
