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

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <StudentProvider>
          <ThemeProvider theme={theme}>
            <RouterProvider router={router}></RouterProvider>
          </ThemeProvider>
        </StudentProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
