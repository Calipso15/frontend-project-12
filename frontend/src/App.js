import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LoginPage from './pages/login/login';
import 'react-toastify/dist/ReactToastify.css';
import ChatPage from './pages/chat/index';
import { AuthProvider } from './auth/AuthContext';
import Signup from './pages/signup/signup';
import NotFoundPage from './pages/notFoundPage';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<ChatPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer />
  </AuthProvider>
);

export default App;
