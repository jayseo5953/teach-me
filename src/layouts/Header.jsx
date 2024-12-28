import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  return <header>{!!user && <button onClick={logout}>Logout</button>}</header>;
};

export default Header;
