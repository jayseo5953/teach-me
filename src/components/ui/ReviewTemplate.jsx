import { Typography } from '@mui/material';

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
          <Typography variant="h3">Good Answers</Typography>
        </>
      ) : null}

      {badAnswers?.length ? (
        <>
          <div>
            <Typography variant="h3">Bad Answers</Typography>
            <div style={{ marginTop: '16px' }}>
              {badAnswers.map((v, i) => (
                <div key={i} style={{ marginBottom: '8px' }}>
                  <div style={{ marginTop: '8px' }}>
                    <Typography>
                      <Typography variant="h4">Student's question:</Typography>
                      {v['AI Question']}
                    </Typography>
                  </div>

                  <div style={{ marginTop: '8px' }}>
                    <Typography variant="h4">Teacher's answer:</Typography>
                    <Typography>{v['User Bad Answer']}</Typography>
                  </div>

                  <div style={{ marginTop: '8px' }}>
                    <Typography variant="h4">AI suggested answer:</Typography>
                    <Typography>{v['Improved Answer']}</Typography>
                  </div>
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
