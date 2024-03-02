import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusSquare } from 'react-bootstrap-icons';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectChannel } from '../redux/reducers/channelsSlice';
import scrollToBottom from '../utils/scrollToBottom';
import { openModal } from '../redux/reducers/modalSlice';
import '../index.css';

const renderChannelButton = (
  { id, name, removable },
  showModal,
  t,
  selectedChannelId,
  handleChannelSelect,
) => {
  const variant = id === selectedChannelId ? 'secondary' : null;

  return (
    <li key={id} className="nav-item w-100">
      {(removable) ? (
        <Dropdown as={ButtonGroup} className="d-flex">
          <Button
            className="w-100 rounded-0 text-start text-truncate"
            key={id}
            variant={variant}
            onClick={() => handleChannelSelect(id)}

          >
            <span className="me-1">#</span>
            {name}
          </Button>
          <Dropdown.Toggle
            split
            className="flex-grow-0"
            variant={variant}
          >
            <span className="visually-hidden">{t('ru.chat.dropdownListSwitch')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={showModal('delete', id)}>
              {t('ru.chat.deleteChannelBtn')}
            </Dropdown.Item>
            <Dropdown.Item onClick={showModal('renaming', id)}>
              {t('ru.chat.renameChannelBtn')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button
          type="button"
          key={id}
          variant={variant}
          className="w-100 rounded-0 text-start"
          onClick={() => handleChannelSelect(id)}
        >
          <span className="me-1">#</span>
          {name}
        </Button>
      )}
    </li>
  );
};

const ChannelBox = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const selectedChannelId = useSelector((state) => state.channels.selectedChannelId);
  const addChannelBattonRef = useRef(null);

  const showModal = (type, id) => () => {
    dispatch(openModal({ type, id }));
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

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
          onClick={showModal('add')}
        >
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map(({ id, name, removable }) => renderChannelButton(
          { id, name, removable },
          showModal,
          t,
          selectedChannelId,
          handleChannelSelect,
        ))}
      </ul>
    </>
  );
};

export default ChannelBox;
