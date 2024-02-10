import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LoginPage from './login/login';
import 'react-toastify/dist/ReactToastify.css';
import ChatPage from './chat/chat';
import { AuthProvider } from './auth/AuthContext';
import Signup from './signup/signup';
import NotFoundPage from './errors';


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
    <ToastContainer />
  </AuthProvider>
);

export default App;
