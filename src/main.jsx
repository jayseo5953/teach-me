import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/index.css';
import { RouterProvider } from 'react-router-dom';
import router from '@/router';
import AuthProvider from '@/contexts/AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/styles/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'pretendard/dist/web/static/pretendard.css';
import StudentProvider from './contexts/StudentContext';
import Clarity from '@microsoft/clarity';
import { GoogleOAuthProvider } from '@react-oauth/google';

const projectId = import.meta.env.VITE_CLARITY_KEY || 'ppvn5adfs6';
const oAuthAPIKey =
  import.meta.env.VITE_GOOGLE_OAUTH_KEY ||
  '493369403972-o4sktu4m75c598gfacii374t1vckj53p.apps.googleusercontent.com';
Clarity.init(projectId);
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={oAuthAPIKey}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <StudentProvider>
            <ThemeProvider theme={theme}>
              <RouterProvider router={router}></RouterProvider>
            </ThemeProvider>
          </StudentProvider>
        </AuthProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
