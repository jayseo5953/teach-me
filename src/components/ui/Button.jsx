import styled from "styled-components";

const StyledButton = styled.button`
  background: ${({ theme, $primary }) =>
    $primary ? theme.colors.brand : "white"};
  color: ${({ theme, $primary }) => ($primary ? "white" : theme.colors.brand)};

  font-size: 1rem;
  margin: 1rem;
  padding: 0.25rem 1rem;
  border: 2px solid ${({ theme }) => theme.colors.brand};
  border-radius: 3px;
`;

function Button({ children, ...props }) {
  return <StyledButton {...props}>{children}</StyledButton>;
}

export default Button;
