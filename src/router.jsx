import { createBrowserRouter } from 'react-router-dom';
import Link from '@/components/ui/Link';
// import Login from '@/pages/Login';
// import ProtectedRoute from '@/layouts/ProtectedRoute';
import Root from '@/pages/Root';
import Dashboard from '@/pages/Dashboard';
import SelectStudent from '@/pages/PreChat/SelectStudent';
import SelectTopic from '@/pages/PreChat/SelectTopic';
import Chat from '@/pages/Chat/Chat';
import ChatSummary from './pages/PostChat/ChatSummary';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Dashboard /> },

      {
        path: 'pre-chat',
        element: <SelectTopic />,
      },

      { path: 'chat', element: <Chat /> },
      { path: 'post-chat', element: <ChatSummary /> },

      // {
      //   element: <ProtectedRoute />,
      //   children: [
      //     {
      //       path: 'dashboard',
      //       element: <Dashboard />,
      //     },
      //   ],
      // },
      // {
      //   path: 'login',
      //   element: <Login />,
      // },
    ],
  },
  {
    path: '*',
    element: (
      <div>
        Page is not found. Please check your URL. Go to{' '}
        <Link to={'/'}>Home</Link>
      </div>
    ),
  },
]);

export default router;
