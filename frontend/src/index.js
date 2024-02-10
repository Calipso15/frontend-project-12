/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom/client';
import init from './init';
import './index.css';
import initSocket from './sockets';

const socket = initSocket();
const vdom = init(socket);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {vdom}
  </React.StrictMode>,
);
