import React from "react";

import AssetsOverviewPage from "./AssetsOverviewPage/AssetsOverviewPage";
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
    return <AssetsOverviewPage token={jwt} handleClickLogout={handleClickLogout} />;
  }

  return <LandingPage handleLoginSuccess={handleLoginSuccess} />;
}

export default App;
