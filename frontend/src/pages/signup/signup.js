/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import signupSchema from '../../schemas/signupSchema';
import { useAuth } from '../../auth/AuthContext';
import Navbar from '../../components/navBar';
import avatar from './avatar_signup.jpg';
import handleSuccess from '../../utils/handleSuccess';
import routes from '../../api/routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';

const Signup = () => {
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const { t } = useTranslation();
  const navigate = useNavigate();
  const inputNameRef = useRef(null);

  useEffect(() => {
    inputNameRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupSchema(t),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(routes.signupPath(), values);
        handleSuccess(response.data, login, navigate);
      } catch (error) {
        if (!error.isAxiosError) {
          toast.error(t('ru.notify.unknown'));
          return;
        }
        if (error.response.status === 409) {
          inputNameRef.current.focus();
          inputNameRef.current.select();
          setErrorMessage(t('ru.errorsTexts.errorValidateUserAlreadyExist'));
        } else {
          toast.error(t('ru.notify.notifyErrorErrorNetwork'));
        }
      }
    },
  });

  return (

    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <Navbar showButton={false} />
          <div className="container-fluid h-100">
            <div className="row justify-content-center align-content-center h-100">
              <div className="col-12 col-md-8 col-xxl-6">
                <div className="card shadow-sm">
                  <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">

                    <div>
                      <img src={avatar} className="rounded-circle" alt="Регистрация" />
                    </div>
                    <form
                      className="w-50"
                      onSubmit={formik.handleSubmit}
                    >
                      <h1 className="text-center mb-4">{t('ru.registration.header')}</h1>
                      <div className="form-floating mb-3">
                        <input
                          placeholder=""
                          name="username"
                          autoComplete="username"
                          required=""
                          id="username"
                          ref={inputNameRef}
                          className={`form-control ${(formik.touched.username && formik.errors.username) || errorMessage ? 'is-invalid' : ''}`}
                          value={formik.values.username}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <label className="form-label" htmlFor="username">{t('ru.registration.name')}</label>
                        <div className="invalid-tooltip">{formik.errors.username}</div>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          placeholder=""
                          name="password"
                          aria-describedby="passwordHelpBlock"
                          required=""
                          autoComplete="new-password"
                          type="password"
                          id="password"
                          className={`form-control ${(formik.touched.password && formik.errors.password) || errorMessage ? 'is-invalid' : ''}`}
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <div className="invalid-tooltip">{formik.errors.password}</div>
                        <label className="form-label" htmlFor="password">{t('ru.authorization.password')}</label>
                      </div>
                      <div className="form-floating mb-4">
                        <input
                          placeholder=""
                          name="confirmPassword"
                          required=""
                          autoComplete="new-password"
                          type="password"
                          id="confirmPassword"
                          className={`form-control ${(formik.touched.confirmPassword && formik.errors.confirmPassword) || errorMessage ? 'is-invalid' : ''}`}
                          value={formik.values.confirmPassword}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.confirmPassword && (
                        <div className="invalid-tooltip">{formik.errors.confirmPassword}</div>
                        )}
                        {errorMessage && (
                        <div className="invalid-tooltip" style={{ display: 'block' }}>{errorMessage}</div>
                        )}

                        <label className="form-label" htmlFor="confirmPassword">{t('ru.registration.confirmPassword')}</label>
                      </div>
                      <button type="submit" className="w-100 btn btn-outline-primary">
                        {t('ru.registration.signUpBtn')}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Signup;
