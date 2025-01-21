import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getProperAnswers } from '@/services/api/reports';
import Link from '@/components/ui/Link';
import PillButton from '@/components/ui/PillButton';
import { useQueries } from '@tanstack/react-query';
import { CenteredBox, SpacedBox } from '@/components/styled/Boxes';
import { green, pink } from '@mui/material/colors';
import styled from 'styled-components';
import Sheet from '@/components/ui/Sheet';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorScreen from '@/components/ErrorScreen';

const ReportKeys = {
  Good: 'Good Answer',
  Bad: 'Bad Answer',
  AIQuestion: 'AI Question',
  UserGoodAnswer: 'User Good Answer',
  UserBadAnswer: 'User Bad Answer',
  ImporvedAnswer: 'Improved Answer',
};

const AnswerContainer = styled(Box)`
  margin-top: 8px;
`;

const AnswerAnalysisContainer = styled(Box)`
  &&:not(:last-child) {
    margin-bottom: 24px;
  }
`;

const Answer = styled(Typography)`
  color: rgba(0, 0, 0, 0.7);
`;

const AnswerAnalysis = ({ answer }) => {
  return (
    <AnswerAnalysisContainer>
      <AnswerContainer>
        <Typography variant="body1" fontWeight={600}>
          🧑‍🎓 Student&apos;s question:
        </Typography>
        <Answer variant="body">{answer[ReportKeys.AIQuestion]}</Answer>
      </AnswerContainer>

      <AnswerContainer>
        <Typography variant="body1" fontWeight={600}>
          🧑‍🏫 Teacher&apos;s answer:
        </Typography>
        <Answer variant="body">
          {answer[ReportKeys.UserGoodAnswer] ||
            answer[ReportKeys.UserBadAnswer] ||
            'No response'}
        </Answer>
      </AnswerContainer>
      {!!answer[ReportKeys.ImporvedAnswer] && (
        <AnswerContainer>
          <Typography variant="body1" fontWeight={600}>
            🤖 AI suggested answer:
          </Typography>
          <Answer variant="body">{answer[ReportKeys.ImporvedAnswer]}</Answer>
        </AnswerContainer>
      )}
    </AnswerAnalysisContainer>
  );
};

const StyledSheet = styled(Sheet)`
  margin-bottom: 24px;
`;

const Review = () => {
  const location = useLocation();
  const { state } = location;
  const [indexToView, setIndexToView] = useState(0);

  const results = useQueries({
    queries: state.lectures.map((lecture) => ({
      queryKey: ['report', lecture.id],
      queryFn: () => getProperAnswers(lecture.id),
      staleTime: Infinity,
    })),
  });

  const [...reports] = results.map((result) => result.data);
  const isLoading = results.some((result) => result.isLoading);
  const failedQueries = results.filter((result) => result.isError);

  const retryFailedQueries = () => {
    failedQueries.forEach((query) => {
      query.refetch();
    });
  };

  if (isLoading) {
    return <LoadingScreen message={'Generating reviews...'} />;
  }

  if (failedQueries.length) {
    return <ErrorScreen onRetry={retryFailedQueries} />;
  }

  const currentReport = reports[indexToView];
  const goodAnswers = currentReport[ReportKeys.Good];
  const badAnswers = currentReport[ReportKeys.Bad];

  return (
    <SpacedBox>
      <CenteredBox marginTop={'4px'} flexDirection={'column'}>
        <Typography variant="caption1" color="primary">
          Select a topic to view a topic report
        </Typography>
        <CenteredBox marginTop={'8px'} flexWrap={'wrap'}>
          {reports.map((_, index) => (
            <PillButton
              variant={index === indexToView ? 'contained' : 'outlined'}
              selected={index === indexToView}
              key={index}
              onClick={() => setIndexToView(index)}
              label={state.lectures[index].topic}
            />
          ))}
        </CenteredBox>
      </CenteredBox>

      <SpacedBox>
        {!!goodAnswers?.length && (
          <StyledSheet>
            <Typography variant="h3" color={green[500]}>
              Good Answers
            </Typography>

            {goodAnswers.map((answer, index) => (
              <AnswerAnalysis key={index} answer={answer} />
            ))}
          </StyledSheet>
        )}

        {!!badAnswers?.length && (
          <StyledSheet>
            <Typography variant="h3" color={pink[500]}>
              Bad Answers
            </Typography>

            {badAnswers.map((answer, index) => (
              <AnswerAnalysis key={index} answer={answer} />
            ))}
          </StyledSheet>
        )}
      </SpacedBox>
      <SpacedBox>
        <Link fullWidth variant="contained" to="/dashboard">
          Return to Dashboard
        </Link>
      </SpacedBox>
      <br />
    </SpacedBox>
  );
};

export default Review;
