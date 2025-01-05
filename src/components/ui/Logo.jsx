import { Box } from '@mui/material';

const Logo = () => {
  return (
    <Box
      component="img"
      src="/assets/brandname.svg"
      alt="Logo"
      sx={{
        width: 86, // Adjust width as needed
        height: 25,
        objectFit: 'contain',
      }}
    />
  );
};

export default Logo;
