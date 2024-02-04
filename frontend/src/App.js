import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './login/login';
import NotFoundPage from './errors';
import ChatPage from './chat/chat';
import { AuthProvider } from './auth/AuthContext';
import Signup from './signup/signup';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/channels" element={<ChatPage />} />
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
