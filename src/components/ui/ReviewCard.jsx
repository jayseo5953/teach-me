import Sheet from './Sheet';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function ReviewCard({ onClick }) {
  const iconWrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#F5F5F5', // subtle background behind the bookmark
  };

  const textStyle = {
    marginLeft: '8px',
    marginRight: 'auto', // pushes chevron to the far right
    fontSize: '14px',
    fontWeight: 500,
    color: '#000', // or #444
  };

  const bookmarkStyle = {
    width: '16px',
    height: '16px',
    fill: 'red',
  };

  return (
    <Sheet
      isFullWidth
      sx={{
        backgroundColor: '#fff',
        padding: '16px',
      }}
      onClick={onClick}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Left icon (bookmark in a circle) */}
        <div style={iconWrapperStyle}>
          <svg viewBox="0 0 24 24" style={bookmarkStyle}>
            <path d="M17 3H7a2 2 0 0 0-2 2v14l6-3.75L17 19V5a2 2 0 0 0-2-2z" />
          </svg>
        </div>

        {/* Text */}
        <div style={textStyle}>Review the lecture</div>

        {/* Right chevron */}
        <div>
          <ChevronRightIcon />
        </div>
      </div>
    </Sheet>
  );
}
