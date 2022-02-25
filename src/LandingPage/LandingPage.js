import React from "react";

import Box from "@mui/material/Box";

import LoginDialog from "../LoginDialog/LoginDialog";
import RegisterDialog from "../RegisterDialog/RegisterDialog";

import Image from "../logo.png";

function LandingPage(props) {
  return (
    <Box
      sx={{
        height: 300,
        width: 300,
        backgroundColor: "white",
        ml: "auto",
        mr: "auto",
        mt: 10,
        textAlign: "center",
        p: 10,
        borderRadius: 8,
      }}
    >
      <img src={Image} alt="Logo" style={{ width: 200 }} />
      <h2>Your Crypto Assets in One Place</h2>
      <RegisterDialog />
      <LoginDialog handleLoginSuccess={props.handleLoginSuccess} />
    </Box>
  );
}

export default LandingPage;
