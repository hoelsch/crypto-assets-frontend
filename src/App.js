import axios from "axios";
import React from "react";
import { useCookies } from "react-cookie";

import AssetsOverviewPage from "./AssetsOverviewPage/AssetsOverviewPage";
import LandingPage from "./LandingPage/LandingPage";

import { BACKEND_URL } from "./config";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["userId"]);
  const [userId, setUserId] = React.useState(cookies.userId || "");

  const handleLogin = (newUserId) => {
    setCookie("userId", newUserId, { path: "/" });
    setUserId(newUserId);
  };

  const handleLogout = () => {
    axios
      .post(`${BACKEND_URL}/logout`, { withCredentials: true })
      .then(() => {
        removeCookie("userId");
        setUserId("");
      });
  };

  if (userId) {
    return (
      <AssetsOverviewPage userId={userId} handleClickLogout={handleLogout} />
    );
  }

  return <LandingPage setUserId={handleLogin} />;
}

export default App;
