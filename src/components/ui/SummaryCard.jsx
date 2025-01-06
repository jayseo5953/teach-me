import { Card, Typography } from '@mui/material';

const SummaryCard = ({ report, student }) => {
  const renderDataRow = (key, value = 1) => {
    const valuePercentage = value * 10;
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          height: '14px',
          marginBottom: '8px',
        }}
      >
        <div
          style={{
            minWidth: '82px',
            maxWidth: '82px',
            marginRight: '8px',
          }}
        >
          <Typography variant="caption1" color="#3C3C4399">
            {key}
          </Typography>
        </div>
        <div
          style={{
            backgroundColor: '#F2F2F2',
            height: '14px',
            width: '100%',
            borderRadius: '22px',
          }}
        >
          <div
            style={{
              background: 'linear-gradient(90deg, #C84E89 0%, #F15F79 100%)',
              width: `${valuePercentage}%`,
              height: '14px',
              borderRadius: '22px',
            }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Card
        sx={{
          padding: '24px',
          paddingBottom: '16px',
          backgroundColor: '#fff',
        }}
      >
        <div
          style={{
            marginBottom: '16px',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              color: '#FE6C89',
            }}
          >
            {student.name}'s Diagnose
          </Typography>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '120px',
              textAlign: 'center',
              marginRight: '16px',
              marginTop: '8px',
            }}
          >
            <div>
              <Typography variant="body3" color="#3C3C4399">
                Total Score
              </Typography>
            </div>
            <Typography display="inline" variant="h2">
              {report?.totalScore}
              <Typography variant="body3" display="inline">
                /10
              </Typography>
            </Typography>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
            }}
          >
            {renderDataRow('Understanding', report['understanding']?.score)}
            {renderDataRow('Achievement', report['ahievement']?.score)}
            {renderDataRow('Satisfaction', report['satisfaction']?.score)}
            {renderDataRow('Attitude', report['attitude']?.score)}
          </div>
        </div>
      </Card>
    </div>
  );
};
export default SummaryCard;
