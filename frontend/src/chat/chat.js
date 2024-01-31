/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { updateMessage, resetMessage } from '../redux/reducers/formDataSlice';
import { updateNewChannelName, resetNewChannelName } from '../redux/reducers/newChannelSlice';
import { addMessage } from '../redux/reducers/messagesSlice';
import { openModal, closeModal } from '../redux/reducers/modalSlice';
import {
  setChannels, addChannel, deleteChannel, renameChannel, selectChannel,
} from '../redux/reducers/channelsSlice';
import { useAuth } from '../auth/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const ChatPage = () => {
  const { token, username, logout } = useAuth();
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.formData);
  const navigate = useNavigate();
  const channels = useSelector((state) => state.channels.channels);
  const messages = useSelector((state) => state.messages.messages);
  const selectedChannelId = useSelector((state) => state.channels.selectedChannelId);
  const newChannelName = useSelector((state) => state.newChannel.name);
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const [openDropdowns, setDropdownOpen] = useState({});
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
        console.error('Ошибка при получении данных с сервера');
      }
    };

    fetchData();
  }, [dispatch, token]);

  const handleChange = (e) => { // добавление нового сообщения
    dispatch(updateMessage(e.target.value));
  };

  const handleSubmit = async (e) => { // отправка сообщений на сервер
    e.preventDefault();
    try {
      const newMessage = { body: formData.message, channelId: selectedChannelId, username };
      await axios.post('/api/v1/messages', newMessage, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(resetMessage());
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
    }
  };

  const handleChannelSelect = (channelId) => { // выбор канала
    dispatch(selectChannel(channelId));
  };

  const handleLogout = () => { // разлогиниваемся
    logout();
    navigate('/login');
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

  const handleNewChannelNameChange = (e) => { // добавление нового канала
    dispatch(updateNewChannelName(e.target.value));
  };

  const handleOpenModal = () => { // открытие окна на добавление канала
    dispatch(openModal());
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => { // закрытие окна после добавления канала
    dispatch(closeModal());
    document.body.classList.remove('modal-open');
    document.body.style.overflow = 'auto';
  };

  const handleSubmitModal = async (e) => { // добавление нового канала
    e.preventDefault();
    try {
      const newChannel = { name: newChannelName };
      axios.post('/api/v1/channels', newChannel, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        dispatch(addChannel(response.data));
        dispatch(resetNewChannelName());
        handleCloseModal();
      });
    } catch (error) {
      console.error('Ошибка при создании канала:', error);
    }
  };

  const handleDeleteChannel = async (channelId) => { // удаление канала
    try {
      await axios.delete(`/api/v1/channels/${channelId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(deleteChannel(channelId));
    } catch (error) {
      console.error('Error deleting channel:', error);
    }
  };

  const handleRenameChannel = async (channelId, newName) => { // переименование канала
    try {
      await axios.patch(`/api/v1/channels/${channelId}`, {
        name: newName,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(renameChannel({ id: channelId, name: newName }));
    } catch (error) {
      console.error('Error renaming channel:', error);
    }
  };

  const getChannelNameById = (channelId) => { // поиск названия выбранного канала
    const channel = channels.find((ch) => ch.id === channelId);
    return channel ? channel.name : 'Неизвестный канал';
  };

  const toggleDropdown = (channelId) => {
    setDropdownOpen((prev) => ({ ...prev, [channelId]: !prev[channelId] }));
  };

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href="/">Hexlet Chat</a>
              <button type="button" className="btn btn-primary" onClick={handleLogout}>Выйти</button>
            </div>
          </nav>
          <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white flex-md-row">
              <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
                <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                  <b>Каналы</b>
                  <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={handleOpenModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                    <span className="visually-hidden">+</span>
                  </button>
                </div>
                <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                  {channels.map((channel) => (
                    <li key={channel.id} className="nav-item w-100">

                      <div className={`btn-group  d-flex align-items-center ${openDropdowns[channel.id] ? 'show' : ''}`}>
                        <button type="button" className={`w-100 rounded-0 text-start btn ${selectedChannelId === channel.id ? 'btn-secondary' : ''}`} onClick={() => handleChannelSelect(channel.id)}>
                          #
                          {' '}
                          {channel.name}
                        </button>
                        {(channel.name !== 'general' && channel.name !== 'random') && (
                        <>
                          <button
                            type="button"
                            className={`btn flex-grow-0 dropdown-toggle dropdown-toggle-split ${selectedChannelId === channel.id ? 'btn-secondary' : ''}`}
                            data-bs-toggle="dropdown"
                            aria-expanded={!!openDropdowns[channel.id]}
                            id={`dropdownMenuButton-${channel.id}`}
                            onClick={() => toggleDropdown(channel.id)}
                          >
                            <span className="visually-hidden">Переключатель выпадающего списка</span>

                          </button>
                          <ul className={`dropdown-menu ${openDropdowns[channel.id] ? 'show' : ''}`}>
                            <li><a className="dropdown-item" onClick={() => handleDeleteChannel(channel.id)} href="#">Удалить</a></li>
                            <li><a className="dropdown-item" onClick={() => handleRenameChannel(channel.id)} href="#">Переименовать</a></li>
                          </ul>
                        </>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

              </div>
              <div className="col p-0 h-100">
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
                      {messages.filter((message) => message.channelId === selectedChannelId).length}
                      {' '}
                      сообщений
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
                          <span className="visually-hidden">Отправить</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isModalOpen && (
          <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <div className="modal-title h4">Добавить канал</div>
                  <button type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close" onClick={handleCloseModal} />
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmitModal}>
                    <div>
                      <input
                        name="name"
                        id="name"
                        className="mb-2 form-control"
                        value={newChannelName}
                        onChange={handleNewChannelNameChange}
                      />
                      <label className="visually-hidden" htmlFor="name">
                        Имя канала
                      </label>
                      <div className="invalid-feedback" />
                      <div className="d-flex justify-content-end">
                        <button type="button" className="me-2 btn btn-secondary" onClick={handleCloseModal}>Отменить</button>
                        <button type="submit" className="btn btn-primary">Отправить</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          )}

        </div>
      </div>
      <div className="Toastify" />
    </div>
  );
};

export default ChatPage;
