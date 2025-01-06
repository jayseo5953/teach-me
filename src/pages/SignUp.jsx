import Button from '@/components/ui/Button';
import { TextField } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StyledButton = styled(Button)`
  margin-top: 8px;
`;

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

const validateSignUp = (formData) => {
  // Confirm Password Validation
  if (formData.get('password') !== formData.get('confirmPassword')) {
    throw new Error('Passwords do not match');
  }
  // Password Validation
  if (
    formData.get('password').length < 8 ||
    !/\d/.test(formData.get('password')) ||
    !/[a-zA-Z]/.test(formData.get('password'))
  ) {
    throw new Error(
      'Password must be at least 8 characters and include a letter and a number'
    );
  }

  return true;
};

const SignUp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { signup, user } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const formData = new FormData(e.target);
    try {
      validateSignUp(formData);
      await signup(formData.get('email'), formData.get('password'));
      navigate('/dashboard');
    } catch (e) {
      let message = e.message;
      if (e.response?.status === 400) {
        message =
          'This email is already registered. Please log in or use a different email to sign up.';
      }
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return user ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Container>
      <HeaderText></HeaderText>
      <LoginText>Sign Up</LoginText>

      <form onSubmit={handleSignUp}>
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
        <label htmlFor="password">
          <Typography variant="footnote">Confirm Password</Typography>
        </label>
        <StyledTextField
          name="confirmPassword"
          type="password"
          placeholder="enter your password again"
          required
        />
        {error && (
          <ErrorMessage>
            <Typography variant="caption1" color="error">
              {error}
            </Typography>
          </ErrorMessage>
        )}

        <StyledButton
          isLoading={isLoading}
          variant="contained"
          fullWidth
          type="submit"
        >
          Sign Up
        </StyledButton>
      </form>
      <SignUpTextContainer>
        <Typography variant="body2">
          Already have an account?
          <Typography
            variant="body2"
            color="primary"
            onClick={() => navigate('/login')}
            sx={{ cursor: 'pointer' }}
          >
            Login
          </Typography>
        </Typography>
      </SignUpTextContainer>
    </Container>
  );
};

export default SignUp;
