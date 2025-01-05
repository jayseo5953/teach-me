import { TextField } from '@mui/material';
import styled from 'styled-components';
import { InputAdornment, IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Sheet from './Sheet';
import { useState } from 'react';

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
    height: 72px;
    max-height: unset;
    align-items: end;
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
`;

const Input = ({
  withSubmitButton = true,
  onSubmit = () => {},
  fullWidth,
  placeholder,
  rest,
}) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(text);
  };
  return (
    <StyledSheet shadowDepth="soft" isFullWidth={fullWidth}>
      <form onSubmit={handleSubmit}>
        <StyledTextField
          name="input"
          fullWidth={fullWidth}
          multiline
          type="submit"
          rows={3}
          onChange={(e) => setText(e.target.value)}
          InputProps={{
            placeholder,
            endAdornment: withSubmitButton ? (
              <StyledAdornment>
                <StyledIconButton type="submit" edge="start" disabled={!text}>
                  <ArrowUpwardIcon />
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

export default Input;
