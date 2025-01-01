import { useContext, createContext, useState } from 'react';

import { login as loginApiCall } from '@/services/api/auth';
const AuthContext = createContext();

const AUTH_KEY = 'auth';

const getUserFromLocalStorage = () => {
  const authuthInLocalStorage = localStorage.getItem(AUTH_KEY);
  return authuthInLocalStorage ? JSON.parse(authuthInLocalStorage) : null;
};

/**
 * Ideally we set token in localstorage to use to retrieve user data.
 * But until we fully implement authentication, set user data to simplify.
 */

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromLocalStorage());

  const login = async (email, password) => {
    const res = await loginApiCall(email, password);
    const userToSet = res.data.user;

    if (userToSet) {
      setUser(userToSet);
      localStorage.setItem(AUTH_KEY, JSON.stringify(userToSet));

      return userToSet;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
