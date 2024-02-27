import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import {
  Modal,
  Form,
  Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import leoProfanity from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useAuth } from '../../auth/AuthContext';
import routes from '../../api/routes';
import modalSchema from '../../schemas/modalSchema';

const RenameChannel = (props) => {
  const { t } = useTranslation();
  const { token, username } = useAuth();
  const { modalInfo, onHide } = props;
  const channels = useSelector((state) => state.channels.channels);
  const channelNames = channels.map(({ name }) => name);

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, []);

  const f = useFormik({
    initialValues: {
      name: modalInfo.item.name,
    },
    validationSchema: modalSchema(t, channels),
    onSubmit: async ({ name }, { setSubmitting, setErrors, setFieldValue }) => {
      const filteredName = leoProfanity.clean(name);
      const requestData = { name: filteredName, user: username };
      try {
        modalSchema(t, channelNames).validateSync({ name: filteredName });
      } catch (validationError) {
        setFieldValue('name', filteredName);
        setErrors({ name: validationError.message });
        setSubmitting(false);
        return;
      }
      try {
        await axios.patch(`${routes.channelPath()}/${modalInfo.item.id}`, requestData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success(t('ru.notify.notifyChangeChannel'));
        onHide();
      } catch (error) {
        console.log(error);
        if (!error.isAxiosError) {
          toast.error(t('ru.notify.unknown'));
        } else {
          toast.error(t('ru.notify.notifyErrorErrorNetwork'));
        }
      } finally {
        setSubmitting(false);
      }
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <Modal show>
      <Modal.Header>
        <Modal.Title>{t('ru.chat.renameChannelModalHeading')}</Modal.Title>
        <Button
          variant="close"
          type="button"
          onClick={onHide}
          aria-label="Close"
          data-bs-dismiss="modal"
        />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={f.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-2"
              disabled={f.isSubmitting}
              ref={inputRef}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              value={f.values.name}
              isInvalid={(f.errors.name && f.touched.name) || !!f.status}
              name="name"
              id="name"
            />
            <label className="visually-hidden" htmlFor="name">{t('ru.chat.inputNameChannel')}</label>
            <Form.Control.Feedback type="invalid">
              {t(f.errors.name) || t(f.status)}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button
                className="me-2"
                variant="secondary"
                type="button"
                onClick={onHide}
              >
                {t('ru.chat.cancelBtn')}
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={f.isSubmitting}
              >
                {t('ru.chat.addBtn')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
