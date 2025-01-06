import { Divider, Typography } from '@mui/material';
import { green, pink } from '@mui/material/colors';

const ReviewTemplate = ({ lecture, report }) => {
  const goodAnswers = report['Good Answer'];
  const badAnswers = report['Bad Answer'];
  return (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Typography variant="h2">Topic: {lecture.topic}</Typography>
      </div>
      {goodAnswers?.length ? (
        <>
          <div>
            <Typography variant="h3" sx={{ color: green[500] }}>
              Good Answers
            </Typography>
            <div style={{ marginTop: '16px' }}>
              {badAnswers.map((v, i) => (
                <div key={i} style={{ marginBottom: '8px' }}>
                  <div style={{ marginTop: '8px' }}>
                    <Typography>
                      <Typography variant="body1" fontWeight={600}>
                        🧑‍🎓 Student's question:
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
                      🧑‍🏫 Teacher's answer:
                    </Typography>
                    <Typography
                      variant="body"
                      sx={{ color: 'rgba(0,0,0,0.7)' }}
                    >
                      {v['User Good Answer']}
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
        </>
      ) : null}

      {badAnswers?.length ? (
        <>
          <div>
            <Typography variant="h3" sx={{ color: pink[500] }}>
              Bad Answers
            </Typography>
            <div style={{ marginTop: '16px' }}>
              {badAnswers.map((v, i) => (
                <div key={i} style={{ marginBottom: '16px' }}>
                  <div style={{ marginTop: '8px' }}>
                    <Typography>
                      <Typography variant="body1" fontWeight={600}>
                        🧑‍🎓 Student's question:
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
                      🧑‍🏫 Teacher's answer:
                    </Typography>
                    <Typography
                      variant="body"
                      sx={{ color: 'rgba(0,0,0,0.7)' }}
                    >
                      {v['User Bad Answer']}
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
                  <br />
                  <Divider />
                </div>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default ReviewTemplate;
