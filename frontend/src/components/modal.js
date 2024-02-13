import React, { useEffect, useRef, useState } from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import modalSchema from '../schemas/modalSchema';
import { useAuth } from '../auth/AuthContext';
import {
  selectChannel,
} from '../redux/reducers/channelsSlice';
import { closeModal } from '../redux/reducers/modalSlice';
import { getChannelNameById, getGeneralChannelId } from '../utils/searchId';
import sendRequest from '../api/sendRequest';
import '../index.css';

const ModalAdd = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { token, username } = useAuth();
  const channels = useSelector((state) => state.channels.channels);
  const { isModalOpen, modalType } = useSelector((state) => state.modal);
  const selectChannelMenu = useSelector((state) => state.selectedChannel.selectedChannelMenu);
  const inputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isModalOpen && (modalType === 'add' || modalType === 'rename')) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isModalOpen, modalType]);

  const handleCloseModal = () => {
    dispatch(closeModal());
    document.body.classList.remove('modal-open');
    document.body.style.overflow = 'auto';
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);

    try {
      const cleanedName = leoProfanity.clean(values.name);
      const requestData = modalType === 'add' ? { name: cleanedName, user: username } : { name: cleanedName };

      switch (modalType) {
        case 'add':
          await sendRequest('post', 'channels', requestData, token)
            .then((addResponse) => {
              dispatch(selectChannel(addResponse.data.id));
              toast.success(t('ru.notify.notifyCreateChannel'));
            });
          break;
        case 'rename':
          sendRequest('patch', `channels/${selectChannelMenu}`, requestData, token);

          dispatch(selectChannel(selectChannelMenu));
          toast.success(t('ru.notify.notifyChangeChannel'));

          break;
        case 'delete':
          await sendRequest('delete', `messages/${selectChannelMenu}`, null, token);
          await sendRequest('delete', `channels/${selectChannelMenu}`, null, token);
          dispatch(selectChannel(getGeneralChannelId(channels)));
          toast.success(t('ru.notify.notifyDeletChannel'));
          handleCloseModal();
          break;
        default:
          break;
      }
    } catch (error) {
      if (!error.isAxiosError) {
        toast.error(t('ru.notify.unknown'));
      } else {
        toast.error(t('ru.notify.notifyErrorErrorNetwork'));
      }
    } finally {
      setIsSubmitting(false);
      handleCloseModal();
    }
  };

  const modalHeadings = {
    add: t('ru.chat.addChannelModalHeading'),
    rename: t('ru.chat.renameChannelModalHeading'),
    delete: t('ru.chat.deleteChannelModalHeading'),
  };

  const renderModalBody = () => {
    if (modalType === 'delete') {
      return (
        <p className="lead">{t('ru.chat.deleteChannelModalText')}</p>
      );
    }
    return (
      <Formik
        initialValues={{ name: modalType === 'rename' ? getChannelNameById(channels, selectChannelMenu) : '' }}
        validationSchema={modalSchema(t, channels)}
        onSubmit={(values) => handleSubmit(values)}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ errors, touched }) => (
          <Form>
            <div>
              <Field
                type="text"
                innerRef={inputRef}
                name="name"
                id="name"
                className={`mb-2 form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
              />
              <ErrorMessage name="name" component="div" className="invalid-feedback" style={{ display: 'block' }} />
            </div>
            <div className="d-flex justify-content-end">
              <button type="button" className="me-2 btn btn-secondary" onClick={handleCloseModal}>{t('ru.chat.cancelBtn')}</button>
              <button type="submit" disabled={isSubmitting} className="btn btn-primary">{t('ru.chat.addBtn')}</button>
            </div>
          </Form>
        )}
      </Formik>
    );
  };

  return (
    isModalOpen && (
      <div>
        <div className="fade modal-backdrop show" />
        <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-title h4">
                  {modalHeadings[modalType]}
                </div>
                <button type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close" onClick={handleCloseModal} />
              </div>
              <div className="modal-body">
                {renderModalBody()}
              </div>
              {modalType === 'delete' && (
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>{t('ru.chat.cancelBtn')}</button>
                  <button type="button" disabled={isSubmitting} className="btn btn-danger" onClick={handleSubmit}>{t('ru.chat.deleteChannelBtn')}</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalAdd;
