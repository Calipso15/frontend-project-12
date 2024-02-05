/* eslint-disable max-len */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider as StoreProvider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Provider, ErrorBoundary } from '@rollbar/react';

import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store';

const rollbarConfig = {
  enabled: true,
  accessToken: '61faecb001aa49a09fb59cac1f76f65b',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StoreProvider store={store}>
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  </StoreProvider>,
);

reportWebVitals();
