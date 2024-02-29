import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as StoreProvider } from 'react-redux';
import { Provider, ErrorBoundary } from '@rollbar/react';
import { addMessage } from './redux/reducers/messagesSlice';
import { addChannel, deleteChannel, renameChannel } from './redux/reducers/channelsSlice';
import ru from './locales/ru';
import store from './redux/store';
import App from './App';

const init = async (socket) => {
  const i18n = i18next.createInstance();

  await i18n
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

  socket.on('newMessage', (message) => {
    store.dispatch(addMessage(message));
  });

  socket.on('newChannel', (channel) => {
    store.dispatch(addChannel(channel));
  });

  socket.on('removeChannel', (data) => {
    const { id: channelId } = data;
    store.dispatch(deleteChannel(channelId));
  });

  socket.on('renameChannel', (data) => {
    const { id: channelId, name: cleanName } = data;
    store.dispatch(renameChannel({ name: cleanName, id: channelId }));
  });

  const rollbarConfig = {
    enabled: process.env.NODE_ENV === 'production',
    accessToken: process.env.ROLLBAR_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
  };

  const vdom = (
    <StoreProvider store={store}>
      <Provider config={rollbarConfig}>
        <ErrorBoundary>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </ErrorBoundary>
      </Provider>
    </StoreProvider>
  );
  return vdom;
};

export default init;
