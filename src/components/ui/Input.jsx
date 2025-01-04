import OutlinedInput from '@mui/material/OutlinedInput';
import styled from 'styled-components';

const StyledInput = styled(OutlinedInput)`
  border-radius: 16px;
  margin-right: 8px;
  input {
    padding: 16px 12px;
  }
`;

const Input = (props) => {
  return <StyledInput {...props} />;
};

export default Input;
