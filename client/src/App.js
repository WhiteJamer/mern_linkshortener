import React from "react";
import { BrowserRouter } from "react-router-dom";
import "materialize-css";
import { useRoutes } from "./routes";
import { AuthContext } from "./context/AuthContext";
import { useAuth } from "./hooks/auth.hook";
import { Navbar } from "./components/Navbar";
import { Loader } from "./components/Loader";

function App() {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if(!ready) {
    return <Loader/>
  }

  return (
    <AuthContext.Provider
      value={{ token, login, logout, userId, isAuthenticated, ready }}
    >
      <BrowserRouter>
        {isAuthenticated && <Navbar />}
        <div className="container" style={{marginBottom: '3rem'}}>
          {routes}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
