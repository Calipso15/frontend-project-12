import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './login/login';
import NotFoundPage from './errors';
import HomePage from './auth/chat';
import { AuthProvider } from './auth/AuthContext';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
