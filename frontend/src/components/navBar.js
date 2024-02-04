import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { // разлогиниваемся
    logout();
    navigate('/login');
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
        <button type="button" className="btn btn-primary" onClick={handleLogout}>Выйти</button>
      </div>
    </nav>
  );
};

export default Navbar;
