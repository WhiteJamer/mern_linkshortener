import React, { Fragment, useEffect, useContext, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { Loader } from "../components/Loader";

const truncate = (str, length) => {
  const truncatedString = str.substr(0, length);
  return truncatedString.length >= length
    ? truncatedString + "..."
    : truncatedString;
};

export default function LinksPage() {
  const auth = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [links, setLinks] = useState(null);

  useEffect(() => {
    const fetchLinks = async () => {
      const data = await request("/api/links", "GET", null, {
        Authorization: `Bearer ${auth.token}`,
      });
      await setLinks(data.links);
    };
    fetchLinks();
    console.log(links);
  }, []);

  return (
    <Fragment>
      <h1>Все ваши ссылки</h1>
      <div className="row">{loading && <Loader />}</div>
      {links ? (
        <table>
          <thead>
            <tr>
              <th>Исходная ссылка</th>
              <th>Короткая ссылка</th>
              <th>Дата создания</th>
              <th>Переходы</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link) => {
              return (
                <tr key={link._id}>
                  <td>
                    <a href={link.from}>{truncate(link.from, 15)}</a>
                  </td>
                  <td>
                    <a href={link.to}>{link.to}</a>
                  </td>
                  <td>{new Date(link.date).toLocaleDateString()}</td>
                  <td>{link.clicks}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        !loading && <p>У вас пока нет ссылок</p>
      )}
    </Fragment>
  );
}
