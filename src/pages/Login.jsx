import Button from '@/components/ui/Button';
import { TextField } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import { parseError } from '@/utils/parseError';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import BrandName from '../components/ui/BrandName';
import { useNavigate } from 'react-router-dom';

const ErrorMessage = styled.div`
  margin-top: 16px;
  text-align: center;
  color: ${({ theme }) => theme.palette.error};
`;

const Header = styled.header`
  height: ${({ theme }) => theme.sizes.headerHeight};
  padding: 24px 0;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.palette.grey[400]};
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0px;
  right: 0px;
  box-sizing: border-box;
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
    fieldset {
      border: none;
    }
    margin-bottom: 24px;
  }
`;

const SignUpTextContainer = styled.div`
  margin-top: 24px;
  text-align: center;
`;

const Login = () => {
  const [error, setError] = useState(null);
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.target);
    try {
      await login(formData.get('email'), formData.get('password'));
      navigate('/dashboard');
    } catch (e) {
      setError(parseError(e));
    }
  };

  return user ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Container>
      <Header>
        <BrandName />
      </Header>
      <HeaderText>BrandName</HeaderText>
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
        <Button variant="contained" fullWidth type="submit">
          Login
        </Button>
        {error && (
          <ErrorMessage>
            <Typography
              variant="caption2"
              color="error"
              textAlign="center"
              sx={{
                display: 'inline-block',
              }}
            >
              Incorrect email or password
            </Typography>
          </ErrorMessage>
        )}
      </form>
      <SignUpTextContainer>
        <Typography variant="body2">
          Don't Have an Account Yet?
          <Typography
            variant="body2"
            color="primary"
            onClick={() => navigate('/sign-up')}
          >
            Create Account
          </Typography>
        </Typography>
      </SignUpTextContainer>
    </Container>
  );
};

export default Login;
