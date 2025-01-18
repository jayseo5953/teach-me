import { Typography } from '@mui/material';

const StudentCard = ({ student, handleSelect, isSelected }) => {
  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        border: isSelected
          ? '3px solid rgba(0, 0, 0)'
          : '0.33px solid rgba(0, 0, 0, 0.12)',
        borderRadius: '24px',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        boxSizing: 'border-box',
        cursor: 'pointer',
      }}
      onClick={handleSelect}
    >
      <div
        style={{
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <img
          src={student.image}
          style={{
            width: '100%',
            objectFit: 'contain',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
          }}
        />
        <Typography
          variant="body3"
          color="#3C3C4399"
          sx={{
            marginBottom: '4px',
            marginTop: '8px',
          }}
        >
          {student.characteristic}
        </Typography>
        <Typography variant="h3">{student.name}</Typography>
        <div
          style={{
            height: 1,
            backgroundColor: '#54545657',
            marginTop: '8px',
            marginBottom: '8px',
          }}
        />
        <Typography variant="caption1" color="#00000080">
          {student.role}
        </Typography>
      </div>
    </div>
  );
};

export default StudentCard;
