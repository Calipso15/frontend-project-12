/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../auth/AuthContext';
import avatar from './avatar_signup.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';

const Signup = () => {
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов')
        .required('Обязательное поле'),
      password: Yup.string()
        .min(6, 'Не менее 6 символов')
        .required('Обязательное поле'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
        .required('Обязательное поле'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/api/v1/signup', values);
        const { token, username } = response.data;
        login(token, username);
        navigate('/channels');
      } catch (error) {
        if (error.response.status === 409) {
          setErrorMessage('Такой пользователь уже существует');
        } else {
          console.error('Ошибка при отправке данных при авторизации', error);
        }
      }
    },
    validateOnChange: false,

  });

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href="/">Hexlet Chat</a>
            </div>
          </nav>
          <div className="container-fluid h-100">
            <div className="row justify-content-center align-content-center h-100">
              <div className="col-12 col-md-8 col-xxl-6">
                <div className="card shadow-sm">
                  <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                    <div>
                      <img src={avatar} className="rounded-circle" alt="Регистрация" />
                    </div>
                    <form className="w-50" onSubmit={formik.handleSubmit}>
                      <h1 className="text-center mb-4">Регистрация</h1>
                      <div className="form-floating mb-3">
                        <input
                          placeholder="От 3 до 20 символов"
                          name="username"
                          autoComplete="username"
                          required=""
                          id="username"
                          className={`form-control ${(formik.touched.username && formik.errors.username) || errorMessage ? 'is-invalid' : ''}`}
                          value={formik.values.username}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <label className="form-label" htmlFor="username">Имя пользователя</label>
                        <div className="invalid-tooltip">{formik.errors.username}</div>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          placeholder="Не менее 6 символов"
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
                        <label className="form-label" htmlFor="password">Пароль</label>
                      </div>
                      <div className="form-floating mb-4">
                        <input
                          placeholder="Пароли должны совпадать"
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

                        <label className="form-label" htmlFor="confirmPassword">Подтвердите пароль</label>
                      </div>
                      <button type="submit" className="w-100 btn btn-outline-primary">Зарегистрироваться</button>

                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Toastify" />
    </div>

  );
};

export default Signup;
