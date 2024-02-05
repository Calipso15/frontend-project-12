/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { addMessage } from '../redux/reducers/messagesSlice';
import {
  setChannels, selectChannel,
} from '../redux/reducers/channelsSlice';
import ModalAdd from '../components/modal';
import { useAuth } from '../auth/AuthContext';
import Navbar from '../components/navBar';
import ChannelBox from '../components/channelBox';
import MessageBox from '../components/messageBox';
import 'bootstrap/dist/css/bootstrap.min.css';

const ChatPage = () => {
  const { token } = useAuth();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('/');
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });
  }, [socket, dispatch]);

  useEffect(() => {
    const fetchData = async () => { // получение данных с сервера по каналам
      try {
        const responseChannels = await axios.get('/api/v1/channels', {
          headers: { Authorization: `Bearer ${token}` },
        });

        dispatch(setChannels(responseChannels.data));
        if (responseChannels.data.length > 0) {
          dispatch(selectChannel(responseChannels.data[0].id));
        }
      } catch (error) {
        console.error(t('ru.notify.notifyServerError'));
      }
    };

    fetchData();
  }, [dispatch, token, t]);

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <Navbar />
          <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white flex-md-row">
              <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
                <ChannelBox />
              </div>
              <div className="col p-0 h-100">
                <MessageBox />
              </div>
            </div>
          </div>
          <ModalAdd />
        </div>
      </div>
      <div className="Toastify" />
    </div>
  );
};

export default ChatPage;
