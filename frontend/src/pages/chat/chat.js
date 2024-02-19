/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../redux/reducers/messagesSlice';
import {
  setChannels, selectChannel,
} from '../../redux/reducers/channelsSlice';
import ModalAdd from '../../components/modal';
import { useAuth } from '../../auth/AuthContext';
import Navbar from '../../components/navBar';
import ChannelBox from '../../components/channelBox';
import MessageBox from '../../components/messageBox';
import sendRequest from '../../api/sendRequest';
import 'bootstrap/dist/css/bootstrap.min.css';

const ChatPage = () => {
  const { token } = useAuth();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseChannels = await sendRequest('get', 'channels', null, token);
        dispatch(setChannels(responseChannels.data));
        if (responseChannels.data.length > 0) {
          dispatch(selectChannel(responseChannels.data[0].id));
        }
        const responseMessages = await sendRequest('get', 'messages', null, token);
        dispatch(setMessage(responseMessages.data));
      } catch (error) {
        if (!error.isAxiosError) {
          toast.error(t('ru.notify.unknown'));
          return;
        }
        toast.error(t('ru.notify.notifyErrorErrorNetwork'));
      }
    };

    fetchData();
  }, [dispatch, token, t]);

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <Navbar showButton />
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
    </div>
  );
};

export default ChatPage;
