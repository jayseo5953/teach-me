import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useStudent } from '../contexts/StudentContext';

const PrivateRoute = () => {
  const { user } = useAuth();
  const { studentContext } = useStudent();

  if (!user) return <Navigate to="/login" />;
  if (!studentContext) return <Navigate to="/select-student" />;
  return <Outlet />;
};

export default PrivateRoute;
