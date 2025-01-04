import Button from './Button';
import { Link as RRLink } from 'react-router-dom';

const Link = ({ children, ...props }) => {
  return (
    <Button component={RRLink} {...props}>
      {children}
    </Button>
  );
};

export default Link;
