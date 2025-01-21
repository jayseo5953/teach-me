import { CenteredBox } from '@/components/styled/Boxes';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Typography } from '@mui/material';

const LoadingScreen = ({ message }) => {
  return (
    <CenteredBox height={'70vh'} flexDirection={'column'}>
      <div>
        <LoadingSpinner />
        <Typography variant="h4" textAlign={'center'} fontWeight={500}>
          {message || 'Loading...'}
        </Typography>
      </div>
    </CenteredBox>
  );
};

export default LoadingScreen;
