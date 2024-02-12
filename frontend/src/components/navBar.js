import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../auth/AuthContext';

const Navbar = ({ showButton }) => {
  const { logout } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">{t('ru.header.heading')}</a>
        {showButton && (
          <button type="button" className="btn btn-primary" onClick={handleLogout}>
            {t('ru.header.logOut')}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
