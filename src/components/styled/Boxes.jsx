import { Box } from '@mui/material';
import styled from 'styled-components';

export const SpacedBox = styled(Box)`
  margin-top: 24px;
`;

export const CenteredBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CenteredSpacedBox = styled(CenteredBox)`
  margin-top: 24px;
`;
