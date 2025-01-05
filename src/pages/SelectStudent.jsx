import Button from '@/components/ui/Button';
import { Grid2, TextField } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import { parseError } from '@/utils/parseError';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import BrandName from '../components/ui/BrandName';
import { useNavigate } from 'react-router-dom';
import StudentCard from '../components/ui/StudentCard';
import { getStudents } from '../services/api/students';
import { useStudent } from '../contexts/StudentContext';

const ErrorMessage = styled.div`
  margin-top: 16px;
  text-align: center;
  color: ${({ theme }) => theme.palette.error};
`;

const Header = styled.header`
  height: ${({ theme }) => theme.sizes.headerHeight};
  padding: 24px 0;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.palette.grey[400]};
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0px;
  right: 0px;
  box-sizing: border-box;
`;

const HeaderText = styled.h4`
  height: 73px;
`;
const LoginText = styled.h1`
  margin-bottom: 24px;
`;
const StyledTextField = styled(TextField)`
  && {
    padding: 0;
    background-color: rgba(0, 0, 0, 0.02);
    border-radius: 16px;
    width: 100%;
    fieldset {
      border: none;
    }
    margin-bottom: 24px;
  }
`;

const SignUpTextContainer = styled.div`
  margin-top: 24px;
  text-align: center;
`;

const StudentsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
`;

const SelectStudent = () => {
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);
  const { user } = useAuth();
  const { getStudents } = useStudent();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await getStudents();
      setStudents(res);
    })();
  }, []);

  return (
    <Container>
      <Grid2 direction={'row'} container spacing={1}>
        <Grid2 container item sm={6} sx={{ marginBottom: '16px' }}>
          {students.slice(0, 1).map((student) => (
            <StudentCard key={student.id} />
          ))}
        </Grid2>
        <Grid2 container item sm={6}>
          {students.slice(2, 3).map((student) => (
            <StudentCard key={student.id} />
          ))}
        </Grid2>
      </Grid2>

      <Button variant="contained" fullWidth type="submit">
        Login
      </Button>
    </Container>
  );
};

export default SelectStudent;
