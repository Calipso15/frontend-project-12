/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider, ErrorBoundary } from '@rollbar/react';
import init from './init';
import initSocket from './sockets';

const socket = initSocket();
const vdom = init(socket);

const rollbarConfig = {
  enabled: process.env.NODE_ENV === 'production',
  accessToken: process.env.ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        {vdom}
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
);
