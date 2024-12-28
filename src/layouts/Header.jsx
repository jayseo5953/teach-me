import Button from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  return <header>{!!user && <Button onClick={logout}>Logout</Button>}</header>;
};

export default Header;
