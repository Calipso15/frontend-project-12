/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import hexletLogo from './loginImage.jpeg';
import { useAuth } from '../auth/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
  const { login } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/api/v1/login', values);
        const { token, username } = response.data;

        login(token, username);
        navigate('/channels');
      } catch (error) {
        setErrorMessage(t('ru.errorsTexts.errorNamePasswordMessage'));
      }
    },
  });
  const usernameInputRef = useRef(null);

  useEffect(() => {
    if (usernameInputRef.current) {
      usernameInputRef.current.focus();
    }
  }, []);

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href="/">{t('ru.header.heading')}</a>
            </div>
          </nav>
          <div className="container-fluid h-100">
            <div className="row align-content-center justify-content-center  h-100">
              <div className="col-12 col-md-8 col-xxl-6">
                <div className="card shadow-sm">
                  <div className="card-body row p-5">
                    <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                      <img src={hexletLogo} className="rounded-circle" alt="Войти" />
                    </div>
                    <form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                      <h1 className="text-center mb-4">{t('ru.authorization.signInBtn')}</h1>
                      <div className="form-floating mb-3">
                        <input
                          name="username"
                          autoComplete="username"
                          required=""
                          placeholder="Ваш ник"
                          id="username"
                          className={`form-control ${errorMessage ? 'is-invalid' : ''}`}
                          onChange={formik.handleChange}
                          value={formik.values.username}
                          ref={usernameInputRef}
                        />
                        <label htmlFor="username">{t('ru.authorization.login')}</label>

                      </div>
                      <div className="form-floating mb-4">
                        <input
                          name="password"
                          autoComplete="current-password"
                          required=""
                          placeholder="Пароль"
                          type="password"
                          id="password"
                          className={`form-control ${errorMessage ? 'is-invalid' : ''}`}
                          onChange={formik.handleChange}
                          value={formik.values.password}
                        />
                        <label className="form-label" htmlFor="password">{t('ru.authorization.password')}</label>
                        {errorMessage && (
                        <div className="invalid-tooltip d-block">
                          {errorMessage}
                        </div>
                        )}
                      </div>
                      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">{t('ru.authorization.signInBtn')}</button>
                    </form>
                  </div>
                  <div className="card-footer p-4">
                    <div className="text-center">
                      <span>{t('ru.footer.authorization')}</span>
                      <a href="/signup">{t('ru.footer.authLink')}</a>
                    </div>
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

export default LoginPage;
