import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const PrivateRoute = () => {
  const { user } = useAuth();
  const { state, pathname } = useLocation();

  if (!user) return <Navigate to="/login" />;

  //TODO: remove this when we offload the dependency on location state
  if (!state && pathname !== '/dashboard') {
    return <Navigate to="dashboard" replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
