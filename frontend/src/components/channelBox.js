/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { selectChannel } from '../redux/reducers/channelsSlice';
import { addSelectedChannel } from '../redux/reducers/selectedChannelSlice';
import { openModal } from '../redux/reducers/modalSlice';

const ChannelBox = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const selectedChannelId = useSelector((state) => state.channels.selectedChannelId);
  const [openDropdowns, setDropdownOpen] = useState({});

  const handleOpenModal = (type) => { // открытие окна на добавление канала
    dispatch(openModal(type));
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
    setDropdownOpen({});
  };

  const handleChannelSelect = (channelId) => { // выбор канала
    dispatch(selectChannel(channelId));
  };

  const handleDeleteChannelButtonClick = (channelId) => {
    dispatch(addSelectedChannel(channelId));
    handleOpenModal('delete', channelId);
  };

  const handleAddChannelButtonClick = () => {
    handleOpenModal('add');
  };

  const handleRenameChannelButtonClick = (channelId) => {
    dispatch(addSelectedChannel(channelId));
    handleOpenModal('rename', channelId);
  };
  const toggleDropdown = (channelId) => {
    setDropdownOpen((prev) => ({ ...prev, [channelId]: !prev[channelId] }));
  };

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('ru.chat.channel')}</b>
        <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={handleAddChannelButtonClick}>
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
                  <span className="visually-hidden">{t('ru.chat.dropdownListSwitch')}</span>

                </button>
                <ul className={`dropdown-menu ${openDropdowns[channel.id] ? 'show' : ''}`}>
                  <li><a className="dropdown-item" onClick={() => handleDeleteChannelButtonClick(channel.id)} href="#">{t('ru.chat.deleteChannelBtn')}</a></li>
                  <li><a className="dropdown-item" onClick={() => handleRenameChannelButtonClick(channel.id)} href="#">{t('ru.chat.renameChannelBtn')}</a></li>
                </ul>
              </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ChannelBox;
