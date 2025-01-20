import Modal from '@/components/ui/Modal';
import styled from 'styled-components';

const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: auto;
`;

import { Box, Typography } from '@mui/material';
import Button from '@/components/ui/Button';

const FinishedChatModal = ({ subject, onConfirm }) => {
  return (
    <StyledModal>
      <div>
        <Box sx={{ fontSize: '70px', textAlign: 'center' }}>🥳</Box>
        <br />
        <Typography variant="h2" textAlign={'center'}>
          Congrats!
        </Typography>
        <br />
        <Typography
          variant="h4"
          textAlign={'center'}
          fontWeight={400}
          fontSize={20}
        >
          You have completed all topics for <b>{subject}</b>
        </Typography>
        <br />
        <br />
      </div>
      <div>
        <Button fullWidth variant="contained" onClick={onConfirm}>
          See insights
        </Button>
      </div>
    </StyledModal>
  );
};

export default FinishedChatModal;
