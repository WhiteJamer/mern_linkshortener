import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useToastMessage } from "../hooks/toastMessage.hook";

export const Navbar = () => {
  const message = useToastMessage();
  const auth = useContext(AuthContext);
  const logoutHandler = event => {
    event.preventDefault();
    auth.logout();
    message("Вы вышли из системы");
  };
  return (
    <nav>
      <div className="nav-wrapper purple darken-4">
        <a className="brand-logo">LinkShortener</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <NavLink to="/links">Ссылки</NavLink>
            </li>
            <li>
              <NavLink to="/create">Создать</NavLink>
            </li>
            <li>
              <NavLink to="/links/44">Детально</NavLink>
            </li>
            <li>
              <a onClick={logoutHandler} href="/">
                <strong>Выйти</strong>
              </a>
            </li>
          </ul>
      </div>
    </nav>
  );
};
