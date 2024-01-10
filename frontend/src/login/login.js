/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import { useFormik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href="/">Hexlet Chat</a>
              <button type="button" className="btn btn-primary">Выйти</button>
            </div>
          </nav>
          <div className="container-fluid h-100">
            <div className="row justify-content-center align-content-center h-100">
              <div className="col-12 col-md-8 col-xxl-6">
                <div className="card shadow-sm">
                  <div className="card-body row p-5">
                    <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                      <img src="" className="rounded-circle" alt="Войти" />
                    </div>
                    <form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                      <h1 className="text-center mb-4">Войти</h1>
                      <div className="form-floating mb-3">
                        <input
                          name="username"
                          autoComplete="username"
                          required=""
                          placeholder="Ваш ник"
                          id="username"
                          className="form-control"
                          onChange={formik.handleChange}
                          value={formik.values.username}
                        />
                        <label htmlFor="username">Ваш ник</label>

                      </div>
                      <div className="form-floating mb-4">
                        <input
                          name="password"
                          autoComplete="current-password"
                          required=""
                          placeholder="Пароль"
                          type="password"
                          id="password"
                          className="form-control"
                          onChange={formik.handleChange}
                          value={formik.values.password}
                        />
                        <label className="form-label" htmlFor="password">Пароль</label>
                      </div>
                      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
                    </form>
                  </div>
                  <div className="card-footer p-4">
                    <div className="text-center">
                      <span>Нет аккаунта?</span>
                      <a href="/signup">Регистрация</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Toastify" />
      </div>
    </div>
  );
};

export default LoginPage;
