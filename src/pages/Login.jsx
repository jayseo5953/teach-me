import Button from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

function Login() {
  const { login, user } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    return login(formData.get("email"), formData.get("password"));
  };

  return user ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <>
      <h1>This is Login page</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email: </label>
        <input name="email" type="email" />
        <label htmlFor="password">Password: </label>
        <input name="password" type="password" />
        <Button type="submit">Login</Button>
      </form>
      <span>Use any email and password</span>
    </>
  );
}

export default Login;
