import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const HomePage = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div>Чат</div>
  );
};

export default HomePage;
