import { TextField } from '@mui/material';
import styled, { css } from 'styled-components';
import { InputAdornment, IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Sheet from '../Sheet';
import { useState } from 'react';
import LoadingSpinner from '../LoadingSpinner';

const StyledSheet = styled(Sheet)`
  && {
    border-radius: 16px;
    padding: 12px;
    .MuiInputBase-formControl {
      padding: 0;
    }
  }
`;

const StyledTextField = styled(TextField)`
  && {
    padding: 0;

    fieldset {
      border: none;
    }
  }
`;

const StyledAdornment = styled(InputAdornment)`
  && {
    max-height: unset;
    align-items: end;
    width: 40px;
  }
`;

const StyledIconButton = styled(IconButton)`
  border-radius: 8px;
  height: 32px;
  width: 32px;
  &,
  &:hover,
  &.Mui-disabled {
    background-color: ${({ theme }) => theme.palette.primary.main};
  }
  &,
  &.Mui-disabled {
    color: #fff;
  }
  &.Mui-disabled {
    opacity: 0.5;
  }

  ${({ $isLoading }) =>
    $isLoading &&
    css`
      && {
        padding: 0;
        opacity: 1;
        .loading-spinner {
          transform: scale(1.5);
        }
      }
    `}
`;

const ChatInput = ({
  withSubmitButton = true,
  onSubmit = () => {},
  fullWidth,
  maxLength,
  placeholder,
  isLoading,
  clearOnSubmit = false,
  rows = 3,
  minRows,
  maxRows,
  rest,
  className,
}) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(text);
    if (clearOnSubmit) {
      setText('');
    }
  };
  return (
    <StyledSheet
      shadowDepth="soft"
      isFullWidth={fullWidth}
      className={className}
    >
      <form onSubmit={handleSubmit}>
        <StyledTextField
          name="input"
          fullWidth={fullWidth}
          multiline
          type="submit"
          rows={rows}
          minRows={minRows}
          maxRows={maxRows}
          value={text}
          disabled={isLoading}
          onChange={(e) => setText(e.target.value)}
          inputProps={{
            maxLength,
          }}
          InputProps={{
            placeholder,
            endAdornment: withSubmitButton ? (
              <StyledAdornment position="end">
                <StyledIconButton
                  type="submit"
                  edge="end"
                  disabled={!text}
                  $isLoading={isLoading}
                >
                  {isLoading ? (
                    <LoadingSpinner color={'#fff'} />
                  ) : (
                    <ArrowUpwardIcon />
                  )}
                </StyledIconButton>
              </StyledAdornment>
            ) : null,
          }}
          {...rest}
        />
      </form>
    </StyledSheet>
  );
};

export default ChatInput;
