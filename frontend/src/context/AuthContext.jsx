import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem('admin')) || null);

  const login = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('admin', JSON.stringify({ username: data.username }));
    setToken(data.token);
    setAdmin({ username: data.username });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ token, admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);