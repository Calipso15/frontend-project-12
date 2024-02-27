import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import { useAuth } from '../../auth/AuthContext';
import routes from '../../api/routes';
import '../../index.css';

const ModalAdd = (props) => {
  const { t } = useTranslation();
  const { token } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { modalInfo, onHide } = props;
  // const modalInfo = useSelector((state) => state.modal);

  const handleDeleteChannel = async () => {
    setIsSubmitting(true);
    try {
      await axios.delete(`${routes.messagesPath()}/${modalInfo.item.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await axios.delete(`${routes.channelPath()}/${modalInfo.item.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(t('ru.notify.notifyDeletChannel'));
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
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('ru.chat.deleteChannelModalHeading')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('ru.chat.deleteChannelModalText')}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>{t('ru.chat.cancelBtn')}</Button>
        <Button variant="danger" onClick={handleDeleteChannel} disabled={isSubmitting}>{t('ru.chat.deleteChannelBtn')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAdd;
