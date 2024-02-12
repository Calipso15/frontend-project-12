import React from 'react';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as StoreProvider } from 'react-redux';
import ru from './locales/ru';
import store from './redux/store';
import App from './App';

const init = () => {
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        ru: {
          translation: { ru },
        },
      },
      lng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });

  return (
    <I18nextProvider i18n={i18n}>
      <StoreProvider store={store}>
        <App />
      </StoreProvider>
    </I18nextProvider>
  );
};

export default init;
