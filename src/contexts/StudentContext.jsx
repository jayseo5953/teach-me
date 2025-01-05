import { useContext, createContext, useState } from 'react';
import bannett from '../../public/assets/bannett.png';
import adrian from '../../public/assets/adrian.png';
import elliott from '../../public/assets/elliott.png';
import harper from '../../public/assets/harper.png';
import { getStudents as getStudentsApiCall } from '@/services/api/students';

const StudentContext = createContext();
const STUDENT_KEY = 'student';

const getStudentFromLocalStorage = () => {
  const studentInLocalStorage = localStorage.getItem(STUDENT_KEY);
  return studentInLocalStorage ? JSON.parse(studentInLocalStorage) : null;
};

const StudentProvider = ({ children }) => {
  const [studentContext, setStudentContext] = useState(
    getStudentFromLocalStorage()
  );

  const setStudent = async (student) => {
    setStudentContext({ ...student });
  };

  const getStudents = async () => {
    const students = await getStudentsApiCall();
    return students;
  };

  return (
    <StudentContext.Provider
      value={{ getStudents, studentContext, setStudent }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export default StudentProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};
