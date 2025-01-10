import Button from '@/components/ui/Button';
import { Box, Divider, TextField } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import { parseError } from '@/utils/parseError';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { googleAuth } from '@/services/api/auth';
import { useGoogleLogin } from '@react-oauth/google';
import Link from '@/components/ui/Link';

const ErrorMessage = styled.div`
  margin-bottom: 8px;
  margin-top: -8px;

  color: ${({ theme }) => theme.palette.error};
`;
const HeaderText = styled.h4`
  height: 73px;
`;
const LoginText = styled.h1`
  margin-bottom: 24px;
`;
const StyledTextField = styled(TextField)`
  && {
    padding: 0;
    background-color: rgba(0, 0, 0, 0.02);
    border-radius: 16px;
    width: 100%;
    margin-bottom: 16px;
    fieldset {
      border: none;
    }
  }
`;

const SignUpTextContainer = styled.div`
  margin-top: 24px;
  text-align: center;
`;

const Login = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login, user, setSessionUser } = useAuth();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const formData = new FormData(e.target);
    try {
      await login(formData.get('email'), formData.get('password'));
      navigate('/dashboard');
    } catch (e) {
      setError(parseError(e));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuthResponse = async (response) => {
    setError(null);
    const result = await googleAuth(response.access_token);
    setSessionUser({ ...result.data, isOAuth: true });
    navigate('/dashboard');
  };
  const handleGoogleAuthError = async (e) => {
    console.error(e.message);
    setError('Failed to login through Google. Please try again.');
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: handleGoogleAuthResponse,
    onError: handleGoogleAuthError,
  });

  return user ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Container>
      <HeaderText></HeaderText>

      <Box
        sx={{
          margin: 'auto',
          marginBottom: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button
          fullWidth
          onClick={handleGoogleLogin}
          startIcon={
            <Box component="img" src="/assets/google-logo.svg" alt="Logo" />
          }
          sx={{
            color: '#0000008A',
            backgroundColor: 'common.white',
            border: '1px solid #0000001A',
          }}
        >
          Continue with Google
        </Button>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Divider
          sx={{ flex: 1, borderStyle: 'dotted', borderColor: 'text.secondary' }}
        />
        <Typography variant="body" sx={{ margin: '8px' }}>
          OR
        </Typography>
        <Divider
          sx={{ flex: 1, borderStyle: 'dotted', borderColor: 'text.secondary' }}
        />
      </Box>

      <LoginText>Login</LoginText>

      <form onSubmit={handleLogin}>
        <label htmlFor="email">
          <Typography variant="footnote">Email</Typography>
        </label>
        <StyledTextField
          name="email"
          type="email"
          placeholder="enter your email address"
          required
        />
        <label htmlFor="password">
          <Typography variant="footnote">Password</Typography>
        </label>
        <StyledTextField
          name="password"
          type="password"
          placeholder="enter your password"
          required
        />
        {error && (
          <ErrorMessage>
            <Typography variant="caption1" color="error">
              {error}
            </Typography>
          </ErrorMessage>
        )}
        <Button
          isLoading={isLoading}
          variant="contained"
          fullWidth
          type="submit"
        >
          Login
        </Button>
      </form>

      <SignUpTextContainer>
        <Typography variant="body2">Don&apos;t Have an Account Yet?</Typography>
        <Link color="primary" to={'/sign-up'}>
          Create Account
        </Link>
      </SignUpTextContainer>
    </Container>
  );
};

export default Login;
