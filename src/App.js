import React from "react";

import CryptoMainPage from "./crypto/CryptoMainPage";
import LandingPage from "./LandingPage/LandingPage";

function App() {
  const storedJwt = localStorage.getItem("token");
  const [jwt, setJwt] = React.useState(storedJwt);

  const handleClickLogout = () => {
    localStorage.removeItem("token");
    setJwt(null);
  };

  const handleLoginSuccess = (token) => {
    localStorage.setItem("token", token);
    setJwt(token);
  };

  if (jwt) {
    return <CryptoMainPage token={jwt} handleClickLogut={handleClickLogout} />;
  }

  return <LandingPage handleLoginSuccess={handleLoginSuccess}/>;
}

export default App;
