import styled from 'styled-components';

const StyledButton = styled.button`
  background: ${({ theme, $primary }) =>
    $primary ? theme.palette.primary.main : 'white'};
  color: ${({ theme, $primary }) =>
    $primary ? 'white' : theme.palette.primary.main};

  font-size: 1rem;
  margin: 1rem;
  padding: 0.25rem 1rem;
  border: 2px solid ${({ theme }) => theme.palette.primary.main};
  border-radius: 3px;
  cursor: pointer;
`;

function Button({ children, ...props }) {
  return <StyledButton {...props}>{children}</StyledButton>;
}

export default Button;
