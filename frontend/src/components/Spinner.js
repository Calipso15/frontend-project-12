import { useTranslation } from 'react-i18next';

const Spinner = () => {
  const { t } = useTranslation();
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">{t('ru.authorization.signInBtnLoadingData')}</span>
      </div>
    </div>
  );
};

export default Spinner;
