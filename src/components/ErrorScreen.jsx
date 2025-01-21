import { CenteredBox } from '@/components/styled/Boxes';
import { Typography } from '@mui/material';
import Button from '@/components/ui/Button';

const ErrorScreen = ({ message = 'Sorry, something went wrong.', onRetry }) => {
  return (
    <CenteredBox height={'70vh'} flexDirection={'column'}>
      <Typography variant="h4" textAlign={'center'} fontWeight={500}>
        {message}
      </Typography>
      {!!onRetry && <Button onClick={onRetry}>Try again</Button>}
    </CenteredBox>
  );
};

export default ErrorScreen;
