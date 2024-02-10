import React from 'react';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as StoreProvider } from 'react-redux';
import { Provider, ErrorBoundary } from '@rollbar/react';

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

  const rollbarConfig = {
    enabled: true,
    accessToken: '815c6dc6f88a4344a43ba2989d9a4e30',
    captureUncaught: true,
    captureUnhandledRejections: true,
  };

  return (
    <I18nextProvider i18n={i18n}>
      <StoreProvider store={store}>
        <Provider config={rollbarConfig}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </Provider>
      </StoreProvider>
    </I18nextProvider>
  );
};

export default init;
