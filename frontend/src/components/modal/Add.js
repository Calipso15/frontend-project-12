/* eslint-disable jsx-a11y/label-has-associated-control */
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
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useAuth } from '../../auth/AuthContext';
import { selectChannel } from '../../redux/reducers/channelsSlice';
import routes from '../../api/routes';
import modalSchema from '../../schemas/modalSchema';

const AddChannel = ({ onHide }) => {
  const { t } = useTranslation();
  const { token } = useAuth();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const channelNames = channels.map(({ name }) => name);
  const inputRef = useRef(null);
  console.log(channels);

  useEffect(() => {
    inputRef.current.focus();
  });

  const f = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: modalSchema(t, channelNames),
    onSubmit: async ({ name }, { setSubmitting, setErrors, setFieldValue }) => {
      setSubmitting(true);
      const filteredName = leoProfanity.clean(name);
      const channel = { name: filteredName };
      try {
        modalSchema(t, channelNames).validateSync({ name: filteredName });
      } catch (validationError) {
        setFieldValue('name', filteredName);
        setErrors({ name: validationError.message });
        setSubmitting(false);
        return;
      }
      try {
        await axios.post(routes.channelPath(), channel, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((addResponse) => {
          dispatch(selectChannel(addResponse.data.id));
          toast.success(t('ru.notify.notifyCreateChannel'));
        });
        onHide();
      } catch (error) {
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
    <>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>
          {t('ru.chat.addChannelModalHeading')}
        </Modal.Title>
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
    </>
  );
};

export default AddChannel;
