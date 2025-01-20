import styled, { css } from 'styled-components';
import { Button as MuiButton } from '@mui/material';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const StyledButton = styled(MuiButton)`
  border-radius: 16px;
  padding: 12px 16px;
  text-transform: none;
  && {
    box-shadow: none;
  }

  &.Mui-disabled {
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: #fff;
    opacity: 0.5;
  }

  ${({ $isLoading }) =>
    $isLoading &&
    css`
      && {
        opacity: 1;
        padding: 0;
        .loading-spinner {
          transform: scale(1.5);
          width: auto;
          height: auto;
        }
      }
    `}
`;

function Button({ children, isLoading, disabled, ...props }) {
  return (
    <StyledButton
      {...props}
      disabled={disabled || isLoading}
      $isLoading={isLoading}
    >
      {isLoading ? <LoadingSpinner color={'#fff'} size="xxs" /> : children}
    </StyledButton>
  );
}

export default Button;
