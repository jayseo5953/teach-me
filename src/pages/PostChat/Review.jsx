import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { getProperAnswers } from '@/services/api/reports';
import ReviewTemplate from '@/components/ReviewTemplate';
import Link from '@/components/ui/Link';
import styled from 'styled-components';
import Button from '@/components/ui/Button';

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

const Review = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const [isLoading, setIsLoading] = useState(true);
  const [reports, setReports] = useState(state.reports || []);
  const [indexToView, setIndexToView] = useState(0);

  useEffect(() => {
    if (reports.length) {
      return setIsLoading(false);
    }
    (async () => {
      setIsLoading(true);
      const lectures = state.lectures;
      const promises = lectures.map((lecture) => getProperAnswers(lecture.id));
      const reports = await Promise.all(promises);
      setReports(reports);
      setIsLoading(false);
      navigate('.', {
        state: { ...location.state, reports },
        replace: true,
      });
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
          {reports.map((lecture, index) => (
            <Pill
              variant={index === indexToView ? 'contained' : 'outlined'}
              key={index}
              onClick={() => setIndexToView(index)}
            >
              {state.lectures[index].topic}
            </Pill>
          ))}
        </Box>
      </Box>

      <br />

      <ReviewTemplate
        lecture={state.lectures[indexToView]}
        report={reports[indexToView]}
      />
      <br />
      <br />
      <Link fullWidth variant="contained" to="/dashboard">
        Return to Dashboard
      </Link>
    </Box>
  );
};

export default Review;
