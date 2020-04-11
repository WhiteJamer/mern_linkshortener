import React, { Fragment, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useToastMessage } from "../hooks/toastMessage.hook";
import { useHttp } from "../hooks/http.hook";

export default function CreatePage() {
  const [shortLink, setShortLink] = useState(null);
  const [lastFrom, setLastFrom] = useState(null); // Последняя используемая исходная ссылка
  const message = useToastMessage();
  const auth = useContext(AuthContext);
  const [link, setLink] = useState("");
  const { request } = useHttp();

  const pressHandler = async (e) => {
    if (e.key === "Enter") {
      try {
        const data = await request(
          "/api/links/generate",
          "POST",
          { from: link },
          { Authorization: `Bearer ${auth.token}` }
        );
        message(`${data.message}: ${data.link.to}`);

        setLastFrom(link);
        setLink("");
        setShortLink(data.link.to)

      } catch (e) {
        console.log(e.message)
        console.log('Что-то не так')
      }
    }
  };

  const resultClickHandler = e => {
    e.target.select()
    document.execCommand('copy');
    message('Скопировано в буфер обмена')
  }
  return (
    <Fragment>
      <h1 className="center-align">Сократить ссылку</h1>
      <div className="row">
        <div className="input-field col s8 offset-s2">
          <input
            value={link}
            id="link"
            type="text"
            onChange={(e) => {
              setLink(e.target.value);
            }}
            onKeyPress={pressHandler}
          />
          <label className="active" htmlFor="link">
            Вставьте ссылку которую хотите сократить
          </label>
        </div>
        {shortLink && 
        <div className="row">
          <div className="input-field col s8 offset-s2">
            <input
              readOnly
              value={shortLink}
              id="shortLink"
              type="text"
              onClick={resultClickHandler}
            />
            <label className="active" htmlFor="shortLink">
              {lastFrom}
            </label>
          </div>
        </div>}
      </div>
    </Fragment>
  );
}
