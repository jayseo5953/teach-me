import { useLocation, useNavigate } from 'react-router-dom';
import Sheet from './Sheet';

export default function ReviewCard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const handleClick = () => {
    navigate('review', { state: { ...state } });
  };

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

  const chevronStyle = {
    width: '16px',
    height: '16px',
    fill: '#999', // arrow color
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
      onClick={handleClick}
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
          <svg viewBox="0 0 24 24" style={chevronStyle}>
            <path d="M9.29 6.71a1 1 0 0 1 1.42 0l4.29 4.29-4.29 4.29a1 1 0 0 1-1.42-1.42L12.17 12l-2.88-2.88a1 1 0 0 1 0-1.41z" />
          </svg>
        </div>
      </div>
    </Sheet>
  );
}
