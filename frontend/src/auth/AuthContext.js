import React, {
  createContext, useContext, useState, useMemo,
} from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [username, setUsername] = useState(localStorage.getItem('username'));

  const login = (newToken, newUser) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('username', newUser);
    setToken(newToken);
    setUsername(newUser);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername(null);
    setToken(null);
  };

  const authValue = useMemo(() => ({
    token, username, login, logout,
  }), [token, username]);

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
