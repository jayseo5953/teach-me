import { createBrowserRouter } from 'react-router-dom';
import Link from '@/components/ui/Link';
import Login from '@/pages/Login';
import ProtectedRoute from '@/pages/WrapperRoutes/ProtectedRoute';
import Root from '@/pages/Root';
import Dashboard from '@/pages/Dashboard';
import SelectTopic from '@/pages/PreChat/SelectTopic';
import Chat from '@/pages/Chat/Chat';
import ChatSummary from '@/pages/PostChat/ChatSummary';
import HideParentRoute from '@/pages/WrapperRoutes/HideParentRoute';
import SignUp from '@/pages/SignUp';
import SelectStudent from '@/pages/SelectStudent';
import Review from '@/pages/PostChat/Review';
import ChatRelatedRoute from './pages/WrapperRoutes/ChatRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'sign-up',
        element: <SignUp />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            path: 'dashboard',
            element: <Dashboard />,
          },
          {
            path: 'select-student',
            element: <SelectStudent />,
          },
          {
            element: <ChatRelatedRoute />,
            children: [
              {
                path: 'pre-chat',
                element: (
                  <HideParentRoute
                    matchPath={'/pre-chat'}
                    PageComponent={<SelectTopic />}
                  />
                ),
              },
              {
                path: 'chat',
                element: (
                  <HideParentRoute
                    matchPath={'/chat'}
                    PageComponent={<Chat />}
                  />
                ),
                children: [
                  {
                    path: 'post-chat',
                    element: (
                      <HideParentRoute
                        matchPath={'/chat/post-chat'}
                        PageComponent={<ChatSummary />}
                      />
                    ),
                    children: [
                      {
                        path: 'review',
                        element: <Review />,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
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
