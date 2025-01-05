import styled from 'styled-components';
import { Button as MuiButton } from '@mui/material';

const StyledButton = styled(MuiButton)`
  border-radius: 16px;
  padding: 12px 16px;
  text-transform: none;
  && {
    box-shadow: none;
  }
`;

function Button({ children, ...props }) {
  return <StyledButton {...props}>{children}</StyledButton>;
}

export default Button;
