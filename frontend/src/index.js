/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { io } from 'socket.io-client';
import init from './init';

const app = async () => {
  const socket = io();
  const vdom = await init(socket);
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<React.StrictMode>{vdom}</React.StrictMode>);
};

app();
