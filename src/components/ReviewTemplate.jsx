import { Typography } from '@mui/material';
import { green, pink } from '@mui/material/colors';
import Sheet from '@/components/ui/Sheet';
import styled from 'styled-components';

const StyledSheet = styled(Sheet)`
  margin-bottom: 16px;
`;

const ReviewTemplate = ({ lecture, report }) => {
  const goodAnswers = report['Good Answer'];
  const badAnswers = report['Bad Answer'];
  return (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Typography variant="h2" textAlign={'center'}>
          Topic: {lecture.topic}
        </Typography>
      </div>
      {goodAnswers?.length ? (
        <StyledSheet>
          <div>
            <Typography
              variant="h3"
              sx={{ color: green[500], marginTop: '16px' }}
            >
              Good Answers
            </Typography>
            <div style={{ marginTop: '16px' }}>
              {goodAnswers.map((v, i) => (
                <div key={i} style={{ marginBottom: '8px' }}>
                  <div style={{ marginTop: '8px' }}>
                    <Typography>
                      <Typography variant="body1" fontWeight={600}>
                        🧑‍🎓 Student&apos;s question:
                      </Typography>
                      <Typography
                        variant="body"
                        sx={{ color: 'rgba(0,0,0,0.7)' }}
                      >
                        {v['AI Question']}
                      </Typography>
                    </Typography>
                  </div>

                  <div style={{ marginTop: '8px' }}>
                    <Typography variant="body1" fontWeight={600}>
                      🧑‍🏫 Teacher&apos;s answer:
                    </Typography>
                    <Typography
                      variant="body"
                      sx={{ color: 'rgba(0,0,0,0.7)' }}
                    >
                      {v['User Good Answer'] || 'No response'}
                    </Typography>
                  </div>
                  {!!v['Improved Answer'] && (
                    <div style={{ marginTop: '8px' }}>
                      <Typography variant="body1" fontWeight={600}>
                        🤖 AI suggested answer:
                      </Typography>
                      <Typography
                        variant="body"
                        sx={{ color: 'rgba(0,0,0,0.7)' }}
                      >
                        {v['Improved Answer']}
                      </Typography>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>{' '}
        </StyledSheet>
      ) : null}

      {badAnswers?.length ? (
        <StyledSheet>
          <div>
            <Typography
              variant="h3"
              sx={{ color: pink[500], marginTop: '16px' }}
            >
              Bad Answers
            </Typography>
            <div style={{ marginTop: '16px' }}>
              {badAnswers.map((v, i) => (
                <div key={i} style={{ marginBottom: '16px' }}>
                  <div style={{ marginTop: '8px' }}>
                    <Typography>
                      <Typography variant="body1" fontWeight={600}>
                        🧑‍🎓 Student&apos;s question:
                      </Typography>
                      <Typography
                        variant="body"
                        sx={{ color: 'rgba(0,0,0,0.7)' }}
                      >
                        {v['AI Question']}
                      </Typography>
                    </Typography>
                  </div>

                  <div style={{ marginTop: '8px' }}>
                    <Typography variant="body1" fontWeight={600}>
                      🧑‍🏫 Teacher&apos;s answer:
                    </Typography>
                    <Typography
                      variant="body"
                      sx={{ color: 'rgba(0,0,0,0.7)' }}
                    >
                      {v['User Bad Answer'] || 'No response'}
                    </Typography>
                  </div>

                  <div style={{ marginTop: '8px' }}>
                    <Typography variant="body1" fontWeight={600}>
                      🤖 AI suggested answer:
                    </Typography>
                    <Typography
                      variant="body"
                      sx={{ color: 'rgba(0,0,0,0.7)' }}
                    >
                      {v['Improved Answer']}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </StyledSheet>
      ) : null}
    </>
  );
};

export default ReviewTemplate;
