import Modal from '@/components/ui/Modal';
import styled from 'styled-components';

const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Button from '@/components/ui/Button';

const ConfirmationModal = ({ topics, onConfirm, onCancel }) => {
  return (
    <StyledModal>
      <div>
        <Box sx={{ fontSize: '70px', textAlign: 'center' }}>😳</Box>
        <List>
          {topics.map((item, index) => {
            let text = item.text;
            if (!item.finished) {
              text += ' (not finished)';
            }
            return (
              <ListItem key={index}>
                <ListItemIcon sx={{ minWidth: '32px' }}>
                  {item.finished ? (
                    <CheckCircleOutlineIcon />
                  ) : (
                    <ErrorOutlineIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ color: '#3c3c43eb' }} />
              </ListItem>
            );
          })}
        </List>
        <br />
      </div>
      <div>
        <Button fullWidth variant="contained" onClick={onCancel}>
          Back to chat
        </Button>
        <Button fullWidth onClick={onConfirm}>
          End chat
        </Button>
      </div>
    </StyledModal>
  );
};

export default ConfirmationModal;
