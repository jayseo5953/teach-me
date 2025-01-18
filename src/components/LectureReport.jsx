import { ListItemText, Typography } from '@mui/material';
import Sheet from '@/components/ui/Sheet';
import { List, ListItem, ListItemIcon } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import styled from 'styled-components';

const StyledListItemText = styled(ListItemText)`
  && span {
    font-size: 14px;
  }
`;

const LectureReport = ({ report, lecture }) => {
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
              background: 'linear-gradient(90deg, #477BFF 0%, #0048C1 100%)',
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
      <Sheet
        isFullWidth
        sx={{
          padding: '24px',
          paddingBottom: '16px',
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
              color: '#477BFF',
            }}
          >
            Diagnose for the topic &quot;{lecture?.topic}&quot;
          </Typography>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '120px',
              textAlign: 'center',
              marginRight: '16px',
            }}
          >
            <div>
              <Typography variant="body3" color="#3C3C4399">
                Total Score
              </Typography>
            </div>
            <Typography display="inline" variant="h2">
              {report?.overallScore.value}
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
            {renderDataRow('Content', report['contentQuality']?.score)}
            {renderDataRow('Delivery', report['delivery']?.score)}
          </div>
        </div>
        <br />
        <Typography variant="h4" fontWeight={500}>
          Improvement Suggestions
        </Typography>
        <List>
          {report.improvements.suggestions.map((item, index) => {
            return (
              <ListItem key={index}>
                <ListItemIcon
                  sx={{ minWidth: '32px', alignSelf: 'flex-start' }}
                >
                  <CheckIcon />
                </ListItemIcon>
                <StyledListItemText
                  primary={item}
                  sx={{ color: '#3c3c43eb', fontSize: '14px' }}
                />
              </ListItem>
            );
          })}
        </List>
      </Sheet>
    </div>
  );
};
export default LectureReport;
