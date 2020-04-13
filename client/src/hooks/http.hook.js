import { useState, useCallback, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useHttp = () => {
  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      try {
        if (body) {
          body = await JSON.stringify(body); // Преобразование в JSON
          headers["Content-Type"] = "application/json";
        }
        const response = await fetch(url, { method, body, headers });
        const data = await response.json();

        if (response.status === 401) {
          auth.logout();
        }

        if (!response.ok) {
          setLoading(false);
          throw new Error(data.message || "Что-то пошло не так");
        }
        setLoading(false);

        return data;
      } catch (e) {
        console.log("Catch", e.message);
        setLoading(false);
        setError(e.message);
        throw e;
      }
    },
    []
  );

  const clearError = () => setError(null);
  return { loading, request, error, clearError };
};
