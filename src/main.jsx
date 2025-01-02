import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/index.css';
import createMockServer from '@/services/mockServer/server';
import { RouterProvider } from 'react-router-dom';
import router from '@/router';
import AuthProvider from '@/contexts/AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/styles/theme';
import 'pretendard/dist/web/static/pretendard.css';

// if (import.meta.env.MODE === 'development') {
createMockServer();
// }

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
