import { Button } from '@mui/material';
import styled from 'styled-components';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Styled Pill Button
const StyledPillButton = styled(Button)`
  border-radius: 999px; /* Pill Shape */
  padding: 2px 12px;
  text-transform: none;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid
    ${({ selected, theme }) =>
      selected ? theme.palette.primary.main : theme.palette.grey[400]};
  background-color: ${({ selected, theme }) =>
    selected ? theme.palette.primary.main : 'transparent'};
  color: ${({ selected, theme }) =>
    selected ? theme.palette.common.white : theme.palette.text.primary};
  transition: background-color 0.3s ease, border-color 0.3s ease;

  &:hover {
    background-color: ${({ selected, theme }) =>
      selected ? theme.palette.primary.dark : theme.palette.grey[100]};
  }
`;

function PillButton({ label, selected, onClick }) {
  return (
    <StyledPillButton
      variant={selected ? 'contained' : 'outlined'}
      selected={selected}
      onClick={() => onClick(label)}
    >
      {selected && <CheckCircleIcon fontSize="small" />}
      {label}
    </StyledPillButton>
  );
}

export default PillButton;
