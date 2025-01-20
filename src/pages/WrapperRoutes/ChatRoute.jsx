import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ChatRelatedRoute = () => {
  const { state } = useLocation();
  if (!state) {
    return <Navigate to="dashboard" replace />;
  }
  return <Outlet />;
};

export default ChatRelatedRoute;
