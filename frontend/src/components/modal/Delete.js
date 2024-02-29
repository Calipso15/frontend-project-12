import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import { useAuth } from '../../auth/AuthContext';
import routes from '../../api/routes';
import { getGeneralChannelId } from '../../utils/searchId';
import { selectChannel } from '../../redux/reducers/channelsSlice';
import '../../index.css';

const ModalAdd = ({ onHide }) => {
  const { t } = useTranslation();
  const { token } = useAuth();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const { channelId } = useSelector((state) => state.modal);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const idDefaultChannel = getGeneralChannelId(channels);

  const handleDeleteChannel = async () => {
    setIsSubmitting(true);
    try {
      await axios.delete(`${routes.channelPath()}/${channelId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(t('ru.notify.notifyDeletChannel'));
      dispatch(selectChannel(idDefaultChannel));
      onHide();
    } catch (error) {
      if (!error.isAxiosError) {
        toast.error(t('ru.notify.unknown'));
      } else {
        toast.error(t('ru.notify.notifyErrorErrorNetwork'));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('ru.chat.deleteChannelModalHeading')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('ru.chat.deleteChannelModalText')}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>{t('ru.chat.cancelBtn')}</Button>
        <Button variant="danger" onClick={handleDeleteChannel} disabled={isSubmitting}>{t('ru.chat.deleteChannelBtn')}</Button>
      </Modal.Footer>
    </>
  );
};

export default ModalAdd;
