import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/index.css';
import createMockServer from '@/services/mockServer/server';
import { RouterProvider } from 'react-router-dom';
import router from '@/router';
import AuthProvider from '@/contexts/AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/styles/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'pretendard/dist/web/static/pretendard.css';

// if (import.meta.env.MODE === 'development') {
createMockServer();
// }

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router}></RouterProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
