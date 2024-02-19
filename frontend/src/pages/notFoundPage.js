import React from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/navBar';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="h-100">
      <Navbar />
      <div className="text-center">
        <img
          alt={t('ru.notFound.header')}
          className="img-fluid h-25"
          src="https://cdn2.hexlet.io/assets/error-pages/404-4b6ef16aba4c494d8101c104236304e640683fa9abdb3dd7a46cab7ad05d46e9.svg"
        />
        <h1 className="h4 text-muted">{t('ru.notFound.header')}</h1>
        <p className="text-muted">
          {t('ru.notFound.message')}
          {' '}
          <a href="/">{t('ru.notFound.linkText')}</a>
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
