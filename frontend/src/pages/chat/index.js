/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../redux/reducers/messagesSlice';
import {
  setChannels, selectChannel,
} from '../../redux/reducers/channelsSlice';
import { useAuth } from '../../auth/AuthContext';
import Navbar from '../../components/navBar';
import ChannelBox from '../../components/channelBox';
import MessageBox from '../../components/messageBox';
import routes from '../../api/routes';
import ChatModal from '../../components/modal/getModal';
import 'bootstrap/dist/css/bootstrap.min.css';

const ChatPage = () => {
  const { token } = useAuth();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    const fetchData = async () => {
      try {
        const responseChannels = await axios.get(routes.channelPath(), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setChannels(responseChannels.data));
        if (responseChannels.data.length > 0) {
          dispatch(selectChannel(responseChannels.data[0].id));
        }
        const responseMessages = await axios.get(routes.messagesPath(), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
  }, [dispatch, token, t, navigate]);

  if (!token) {
    return null;
  }

  return (

    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">

          <Navbar showButton />
          <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <ChatModal />
            <div className="row h-100 bg-white flex-md-row">
              <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
                <ChannelBox />
              </div>
              <div className="col p-0 h-100">
                <MessageBox />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
