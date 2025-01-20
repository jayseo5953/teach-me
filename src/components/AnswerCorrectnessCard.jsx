import { Typography } from '@mui/material';
import Sheet from '@/components/ui/Sheet';

const AnswerCorrectnessCard = ({ percentage = 70 }) => {
  // Layout for donut chart + text on the right
  const rowStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexGrow: 1,
  };

  // Text label to the right of donut
  const labelStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
  };

  //
  // --- DONUT CHART LOGIC (using inline SVG) ---
  //
  const radius = 45; // radius of the circle
  const strokeWidth = 10; // thickness of the stroke
  const normalizedRadius = radius - strokeWidth * 0.5; // ensures the stroke is fully inside the SVG
  const circumference = normalizedRadius * 2 * Math.PI;
  // For 70%, offset = total circumference - (70% of total circumference)
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Sheet
      isFullWidth
      sx={{
        backgroundColor: '#FFF',
        height: '200px',
        padding: '24px',
        marginTop: '8px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Title */}
      <Typography
        variant="body1"
        sx={{
          fontWeight: 600,
          color: '#b13af2',
        }}
      >
        Answer correctness
      </Typography>

      {/* Donut chart + Right text */}
      <div style={rowStyle}>
        {/* Donut chart via inline SVG */}
        <svg width="100" height="100">
          {/* Background circle (trail) */}
          <circle
            stroke="#eaeaea"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx="50"
            cy="50"
          />
          {/* Progress circle (actual fill) */}
          <circle
            stroke="#FFA500" // orange
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx="50"
            cy="50"
          />
          {/* Percentage in the center */}
          <text
            x="50%"
            y="50%"
            fill="#333"
            fontSize="22"
            dominantBaseline="middle"
            textAnchor="middle"
          >
            {`${percentage}%`}
          </text>
        </svg>

        {/* Right-hand label */}
        <div style={labelStyle}>Correct answers {percentage}%</div>
      </div>
    </Sheet>
  );
};

export default AnswerCorrectnessCard;
