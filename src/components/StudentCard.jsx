import { Box, Typography } from '@mui/material';
import styled from 'styled-components';
import { CenteredBox } from './styled/Boxes';

const StudentCardContainer = styled(CenteredBox)`
  background-color: #ffffff;
  border: ${(props) =>
    props.$isSelected
      ? '3px solid rgba(0, 0, 0)'
      : '0.33px solid rgba(0, 0, 0, 0.12)'};
  border-radius: 24px;
  width: auto;
  height: 100%;
  flex-direction: column;
  box-sizing: border-box;
  cursor: pointer;
  padding: 12px;
  text-align: center;
  overflow: hidden;

  &:hover {
    scale: 1.1;
  }

  &&:not(:last-child) {
    margin-right: 16px;
  }
`;

const Divider = styled(Box)`
  height: 1px;
  background-color: #54545657;
  margin-top: 8px;
  margin-bottom: 8px;
  width: 100%;
`;

const PrimaryStudentCard = ({ student, onClick, isSelected }) => {
  return (
    <StudentCardContainer $isSelected={isSelected} onClick={onClick}>
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
      <Divider />
      <Typography variant="caption1" color="#00000080">
        {student.role}
      </Typography>
    </StudentCardContainer>
  );
};

const SecondaryCartContainer = styled(StudentCardContainer)`
  background-color: transparent;
  padding: 0;
  align-items: unset;
  border: none;
`;

const SecondaryStudentCard = ({ student, onClick }) => {
  return (
    <SecondaryCartContainer onClick={onClick}>
      <img
        src={student.image}
        style={{
          height: 'auto',
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
    </SecondaryCartContainer>
  );
};

const StudentCard = ({ type = 'primary', ...rest }) => {
  return type === 'primary' ? (
    <PrimaryStudentCard {...rest} />
  ) : (
    <SecondaryStudentCard {...rest} />
  );
};

export default StudentCard;
