import { useEffect, useState } from 'react';
import { Box, Typography, Popover } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Button from '@/components/ui/Button';
import { getHint } from '@/services/api/hints';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const StyledPopover = styled(Popover)`
  && .MuiPaper-root {
    border-radius: 32px;
    margin-right: 24px;
    max-width: 400px;
  }
`;

const HintPill = ({ question }) => {
  const [hintEl, setHintEl] = useState(null);
  const [hintFetchedFor, setHintFetchedFor] = useState(null);

  const handleOpenHint = (event) => {
    setHintEl(event.currentTarget);
  };

  const { data: hint, isLoading: hintLoading } = useQuery({
    queryKey: ['hint', question.id],
    queryFn: () => getHint(question.content),
    enabled: !!hintEl && hintFetchedFor !== question.id,
  });

  const handleHintClose = () => {
    setHintEl(null);
  };

  useEffect(() => {
    if (hint) {
      setHintFetchedFor(question.id);
    }
  }, [hint]);

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleOpenHint}
        startIcon={<HelpOutlineIcon />}
        sx={{ backgroundColor: 'primary.95', color: 'primary.dark' }}
        style={{ padding: '4px 12px' }}
      >
        Hint
      </Button>
      <StyledPopover
        id={hintEl && 'simple-popover'}
        open={!!hintEl}
        anchorEl={hintEl}
        onClose={handleHintClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box padding={'24px'} backgroundColor={'#fff'}>
          {hintLoading ? <LoadingSpinner /> : <Typography>{hint}</Typography>}
        </Box>
      </StyledPopover>
    </div>
  );
};

export default HintPill;
