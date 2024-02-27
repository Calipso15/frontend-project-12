import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusSquare } from 'react-bootstrap-icons';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectChannel } from '../redux/reducers/channelsSlice';
import scrollToBottom from '../utils/scrollToBottom';
import getModal from './modal/getModal';
import '../index.css';

const renderChannelButton = ({ item, showModal }, t, selectedChannelId, handleChannelSelect) => {
  const isDefaultChannel = item.name === 'general' || item.name === 'random';
  const variant = item.id === selectedChannelId ? 'secondary' : null;

  return (
    <li key={item.id} className="nav-item w-100">
      {!isDefaultChannel ? (
        <Dropdown as={ButtonGroup} className="d-flex">
          <Button
            className="w-100 rounded-0 text-start text-truncate"
            key={item.id}
            variant={variant}
            onClick={() => handleChannelSelect(item.id)}

          >
            <span className="me-1">#</span>
            {item.name}
          </Button>
          <Dropdown.Toggle
            split
            className="flex-grow-0"
            variant={variant}
          >
            <span className="visually-hidden">{t('ru.chat.dropdownListSwitch')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => showModal('delete', item)}>
              {t('ru.chat.deleteChannelBtn')}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => showModal('renaming', item)}>
              {t('ru.chat.renameChannelBtn')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button
          type="button"
          key={item.id}
          variant={variant}
          className="w-100 rounded-0 text-start"
          onClick={() => handleChannelSelect(item.id)}

        >
          <span className="me-1">#</span>
          {item.name}
        </Button>
      )}
    </li>
  );
};
const renderModal = ({ modalInfo, hideModal, channels }) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} setItems={channels} onHide={hideModal} />;
};

const ChannelBox = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const selectedChannelId = useSelector((state) => state.channels.selectedChannelId);
  const addChannelBattonRef = useRef(null);

  const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const hideModal = () => setModalInfo({ type: null, item: null });
  const showModal = (type, item = null) => setModalInfo({ type, item });

  useEffect(() => {
    if (!modalInfo.item) {
      addChannelBattonRef.current.focus();
    }
  }, [modalInfo]);

  useEffect(() => {
    scrollToBottom();
  }, [selectedChannelId]);

  const handleChannelSelect = (channelId) => {
    dispatch(selectChannel(channelId));
  };

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4 ml-auto">
        <b>{t('ru.chat.channel')}</b>
        <button
          ref={addChannelBattonRef}
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={() => showModal('add', channels)}
        >
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => renderChannelButton(
          { item: channel, showModal },
          t,
          selectedChannelId,
          handleChannelSelect,
        ))}
        {renderModal({ modalInfo, hideModal })}
      </ul>
    </>
  );
};

export default ChannelBox;
