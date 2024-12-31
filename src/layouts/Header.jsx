import Button from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header>
      {user ? (
        <Button onClick={logout}>Logout</Button>
      ) : (
        <Link to={'/login'}>Login</Link>
      )}
    </header>
  );
};

export default Header;
