/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import React from 'react';
import leoProfanity from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useAuth } from '../auth/AuthContext';
import {
  addChannel, deleteChannel, renameChannel, selectChannel,
} from '../redux/reducers/channelsSlice';
import { resetNewChannelName } from '../redux/reducers/newChannelSlice';
import { closeModal } from '../redux/reducers/modalSlice';

const ModalAdd = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { token, username } = useAuth();
  const channels = useSelector((state) => state.channels.channels);
  const { isModalOpen, modalType } = useSelector((state) => state.modal);
  const selectChannelMenu = useSelector((state) => state.selectedChannel.selectedChannelMenu);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, (t('ru.errorsTexts.errorValidateMax20Min3')))
      .max(20, (t('ru.errorsTexts.errorValidateMax20Min3')))
      .required((t('ru.errorsTexts.errorValidateRequiredField')))
      .test('is-unique', (t('ru.errorsTexts.errorValidateUniquePasswords')), async (value) => !channels.some((channel) => channel.name === value)),
  });

  const handleCloseModal = () => { // закрытие окна после добавления канала
    dispatch(closeModal());
    document.body.classList.remove('modal-open');
    document.body.style.overflow = 'auto';
  };

  const handleRenameChannel = async (newName) => { // переименование канала
    const channelId = selectChannelMenu;
    try {
      const cleanName = leoProfanity.clean(newName);

      await axios.patch(`/api/v1/channels/${channelId}`, {
        name: cleanName,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(renameChannel({ id: channelId, name: cleanName }));
      toast.success(t('ru.notify.notifyChangeChannel'));

      dispatch(selectChannel(channelId));
      handleCloseModal();
    } catch (error) {
      console.error(t('ru.notify.notifyServerError'), error);
    }
  };
  const generalChannel = channels.find((channel) => channel.name === 'general');

  const handleDeleteChannel = async () => { // удаление канала
    const channelId = selectChannelMenu;
    try {
      await axios.delete(`/api/v1/messages/${channelId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await axios.delete(`/api/v1/channels/${channelId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(deleteChannel(channelId));
      toast.success(t('ru.notify.notifyDeletChannel'));
      dispatch(selectChannel(generalChannel.id));
      handleCloseModal();
    } catch (error) {
      console.error(t('ru.notify.notifyServerError'), error);
    }
  };

  const getChannelNameById = (channelId) => { // поиск названия выбранного канала по айди
    const channel = channels.find((ch) => ch.id === channelId);
    return channel ? channel.name : '';
  };

  const handleSubmitModal = async (values) => { // добавление нового канала
    try {
      const cleanedName = leoProfanity.clean(values.name);

      const newChannel = { name: cleanedName, user: username };
      axios.post('/api/v1/channels', newChannel, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        dispatch(addChannel(response.data));
        dispatch(selectChannel(response.data.id));
        toast.success(t('ru.notify.notifyCreateChannel'));

        dispatch(resetNewChannelName());
        handleCloseModal();
      });
    } catch (error) {
      console.error(t('ru.notify.notifyServerError'), error);
    }
  };

  return (
    <>
      {isModalOpen && modalType === 'add' && (
      <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">{t('ru.chat.addChannelModalHeading')}</div>
              <button type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close" onClick={handleCloseModal} />
            </div>
            <div className="modal-body">
              <Formik
                initialValues={{ name: '' }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                  handleSubmitModal(values);
                  resetForm();
                }}
                validateOnChange={false}
              >
                {({
                  isSubmitting, dirty, errors, touched,
                }) => (
                  <Form>
                    <div>
                      <Field type="text" name="name" id="name" className={`mb-2 form-control ${touched.name && errors.name ? 'is-invalid' : ''}`} />
                      <ErrorMessage name="name" component="div" className="invalid-feedback" style={{ display: 'block' }} />
                    </div>
                    <div className="d-flex justify-content-end">
                      <button type="button" className="me-2 btn btn-secondary" onClick={handleCloseModal}>{t('ru.chat.cancelBtn')}</button>
                      <button type="submit" className="btn btn-primary" disabled={isSubmitting || !dirty}>{t('ru.chat.addBtn')}</button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      )}
      {isModalOpen && modalType === 'delete' && (
      <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">{t('ru.chat.deleteChannelModalHeading')}</div>
              <button type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close" onClick={handleCloseModal} />
            </div>
            <div className="modal-body">
              <p className="lead">{t('ru.chat.deleteChannelModalText')}</p>
              <div className="d-flex justify-content-end">
                <button type="button" className="me-2 btn btn-secondary" onClick={handleCloseModal}>{t('ru.chat.cancelBtn')}</button>
                <button type="button" className="btn btn-danger" onClick={() => handleDeleteChannel()}>{t('ru.chat.deleteChannelBtn')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
      {isModalOpen && modalType === 'rename' && (
      <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">{t('ru.chat.renameChannelModalHeading')}</div>
              <button type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close" onClick={handleCloseModal} />

            </div>
            <div className="modal-body">
              <Formik
                initialValues={{ name: getChannelNameById(selectChannelMenu) }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                  handleRenameChannel(values.name);
                  resetForm();
                }}
                validateOnChange={false}
              >
                {({
                  isSubmitting, dirty, errors, touched,
                }) => (
                  <Form>
                    <div>
                      <Field type="text" name="name" id="name" className={`mb-2 form-control ${touched.name && errors.name ? 'is-invalid' : ''}`} />
                      <label className="visually-hidden" htmlFor="name">{t('ru.chat.inputNameChannel')}</label>
                      <ErrorMessage name="name" component="div" className="invalid-feedback" style={{ display: 'block' }} />
                      <div className="d-flex justify-content-end">
                        <button type="button" className="me-2 btn btn-secondary" onClick={handleCloseModal}>{t('ru.chat.cancelBtn')}</button>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting || !dirty}>{t('ru.chat.addBtn')}</button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default ModalAdd;
