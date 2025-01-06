import Button from '@/components/ui/Button';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StudentCard from '@/components/ui/StudentCard';
import { useStudent } from '@/contexts/StudentContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const SelectStudent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { getStudents, studentContext, setStudent } = useStudent();
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(studentContext);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await getStudents();
      setIsLoading(false);
      setStudents(res);
    })();
  }, []);

  const handleSelect = (student) => {
    setSelectedStudent(student);
  };

  const handleClickButton = () => {
    setStudent(selectedStudent);
    navigate('/dashboard');
  };

  return (
    <Container
      sx={{
        marginTop: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div>
            <Typography
              variant="h3"
              sx={{
                marginBottom: '8px',
              }}
            >
              Choose your student
            </Typography>
            <Grid container spacing={2}>
              {students.map((student, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <StudentCard
                    key={student.id}
                    student={student}
                    isSelected={selectedStudent?.id === student.id}
                    handleSelect={() => handleSelect(student)}
                  />
                </Grid>
              ))}
            </Grid>
            <br />
            <br />
            <Button
              disabled={!selectedStudent}
              variant="contained"
              fullWidth
              onClick={handleClickButton}
            >
              Start
            </Button>
          </div>
        )}
      </Box>
    </Container>
  );
};

export default SelectStudent;
