import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useStudent } from '../../contexts/StudentContext';

const SecondaryStudentCard = ({ student }) => {
  const navigate = useNavigate();
  const { setStudent } = useStudent();

  const handleClick = () => {
    setStudent(student);
    navigate('/dashboard');
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 'auto',
        textAlign: 'center',
        marginRight: '16px',
        overflow: 'hidden',
      }}
      onClick={handleClick}
    >
      <img
        src={student.image}
        style={{
          height: '94px',
          borderRadius: '16px',
        }}
      />
      <div
        style={{ display: 'flex', flexDirection: 'column', marginTop: '8px' }}
      >
        <Typography noWrap variant="caption1" color="#00000080">
          {student.role}
        </Typography>
        <Typography variant="body">{student.name}</Typography>
      </div>
    </div>
  );
};

export default SecondaryStudentCard;
