import React, { Fragment, useState, useEffect, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { useToastMessage } from "../hooks/toastMessage.hook";
import { AuthContext } from "../context/AuthContext";

export default function AuthPage() {
  const message = useToastMessage();

  const auth = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const { loading, error, request, clearError } = useHttp();

  useEffect(() => {
    if (error) {
      message(error);
    }
    clearError();
  }, [error]);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
      console.log('Ответ с сервера: ID', data.userId)
      message("Вход выполнен");
    } catch (e) {}
  };

  return (
    <Fragment>
      <div className="row">
        <form className="col s12">
          <h3 className="center-align">Форма авторизации</h3>
          <div className="row">
            <div className="input-field col s12">
              <input
                onChange={changeHandler}
                id="email"
                name="email"
                type="email"
              />
              <label htmlFor="email">E-mail</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                onChange={changeHandler}
                id="password"
                name="password"
                type="password"
              />
              <label htmlFor="password">Пароль</label>
            </div>
          </div>
          <div className="row btn-padding-1">
            <button
              disabled={loading}
              onClick={loginHandler}
              className="waves-effect waves-light btn-small purple darken-1"
            >
              Войти
            </button>
            <button
              onClick={registerHandler}
              disabled={loading}
              className="waves-effect waves-light btn-small"
            >
              Зарегистрироваться
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
}
