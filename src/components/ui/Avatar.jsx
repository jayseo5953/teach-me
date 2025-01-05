import { Avatar as MuiAvatar } from '@mui/material';
import styled from 'styled-components';

const sizes = {
  sm: '40px',
  md: '150px',
  lg: '275px',
};

const StyledAvatar = styled(MuiAvatar)`
  width: ${({ $size }) => sizes[$size]};
  height: ${({ $size }) => sizes[$size]};
`;

const Avatar = ({ size = 'sm', ...rest }) => {
  return <StyledAvatar $size={size} {...rest} />;
};

export default Avatar;
