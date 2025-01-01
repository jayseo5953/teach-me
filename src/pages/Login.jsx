import Button from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { parseError } from '@/utils/parseError';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.brand};
`;

function Login() {
  const [error, setError] = useState(null);
  const { login, user } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.target);
    try {
      await login(formData.get('email'), formData.get('password'));
    } catch (e) {
      setError(parseError(e));
    }
  };

  return user ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <>
      <h1>This is Login page</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email: </label>
        <input
          name="email"
          type="email"
          required
          defaultValue={'john.doe@example.com'}
        />
        <label htmlFor="password">Password: </label>
        <input
          name="password"
          type="password"
          defaultValue="password"
          required
        />
        <Button type="submit">Login</Button>
        {error && <ErrorMessage>Login failed: {error} </ErrorMessage>}
      </form>
    </>
  );
}

export default Login;
