import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { getProperAnswers } from '../../services/api/reports';
import ReviewTemplate from '../../components/ui/ReviewTemplate';

const Review = () => {
  const location = useLocation();
  const { state } = location;
  const [isLoading, setIsLoading] = useState(true);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const lectures = state.lectures;
      const promises = lectures.map((lecture) => getProperAnswers(lecture.id));
      const reports = await Promise.all(promises);
      setReports(reports);
      setIsLoading(false);
    })();
  }, []);

  const renderLoading = () => {
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
              Getting all questions...
            </Typography>
          </div>
        </div>
      </Box>
    );
  };

  if (isLoading) return renderLoading();

  return (
    <Box sx={{ paddingTop: '24px', paddingBottom: '24px' }}>
      {state.lectures.map((v, i) => {
        return <ReviewTemplate key={i} lecture={v} report={reports[i]} />;
      })}
    </Box>
  );
};

export default Review;
