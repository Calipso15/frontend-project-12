/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { useSelector, useDispatch } from 'react-redux';
import { updateMessage, resetMessage } from '../redux/reducers/formDataSlice';
import { useAuth } from '../auth/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const MessageBox = () => {
  const { t } = useTranslation();
  const { token, username } = useAuth();
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.formData);
  const channels = useSelector((state) => state.channels.channels);
  const messages = useSelector((state) => state.messages.messages);
  const selectedChannelId = useSelector((state) => state.channels.selectedChannelId);

  const handleChange = (e) => { // добавление нового сообщения
    dispatch(updateMessage(e.target.value));
  };

  const handleSubmit = async (e) => { // отправка сообщений на сервер
    e.preventDefault();
    try {
      const filteredMessage = leoProfanity.clean(formData.message);
      const newMessage = { body: filteredMessage, channelId: selectedChannelId, username };
      await axios.post('/api/v1/messages', newMessage, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(resetMessage());
    } catch (error) {
      console.error(t('ru.notify.notifyServerError'), error);
    }
  };

  const renderMessages = () => { // отображение сообщений
    const filteredMessages = messages.filter((message) => message.channelId === selectedChannelId);
    return filteredMessages.map((message) => (
      <div key={message.id} className="text-break mb-2">
        <b>{message.username}</b>
        {': '}
        {message.body}
      </div>
    ));
  };

  const getChannelNameById = (channelId) => { // поиск названия выбранного канала по айди
    const channel = channels.find((ch) => ch.id === channelId);
    return channel ? channel.name : '';
  };
  const messagesLength = messages.filter((message) => message.channelId === selectedChannelId);

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            #
            {' '}
            {getChannelNameById(selectedChannelId)}
          </b>
        </p>
        <span className="text-muted">
          {t('ru.chat.counter.count', { count: messagesLength.length })}
        </span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {renderMessages()}
      </div>
      <div className="mt-auto px-5 py-3">
        <form noValidate className="py-1 border rounded-2" onSubmit={handleSubmit}>
          <div className="input-group has-validation">
            <input name="body" aria-label="Новое сообщение" placeholder="Введите сообщение..." className="border-0 p-0 ps-2 form-control" value={formData.message} onChange={(e) => handleChange(e)} />
            <button type="submit" className="btn btn-group-vertical">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                {selectedChannelId && (
                <div>
                  <h3>
                    Selected Channel:
                    {selectedChannelId}
                  </h3>
                </div>
                )}
                {' '}
              </svg>
              <span className="visually-hidden">{t('ru.chat.addBtn')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageBox;
