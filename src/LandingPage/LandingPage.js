import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import LoginDialog from "../LoginDialog/LoginDialog";
import RegisterDialog from "../RegisterDialog/RegisterDialog";

import Image from "../logo.png";

function LandingPage(props) {
  const [registerDialogOpen, setRegisterDialogOpen] = React.useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = React.useState(false);

  const style = {
    height: 300,
    width: 300,
    backgroundColor: "white",
    ml: "auto",
    mr: "auto",
    mt: 10,
    textAlign: "center",
    p: 10,
    borderRadius: 8,
  };

  return (
    <Box sx={style}>
      <img src={Image} alt="Logo" style={{ width: 200 }} />
      <h2>Your Crypto Assets in One Place</h2>
      <Button sx={{ mt: 5, mr: 5 }} onClick={() => setRegisterDialogOpen(true)}>
        Register
      </Button>
      <Button
        sx={{ mt: 5 }}
        variant="contained"
        onClick={() => setLoginDialogOpen(true)}
      >
        Login
      </Button>
      <RegisterDialog
        open={registerDialogOpen}
        handleClose={() => setRegisterDialogOpen(false)}
      />
      <LoginDialog
        open={loginDialogOpen}
        setUserId={props.setUserId}
        handleClose={() => setLoginDialogOpen(false)}
      />
    </Box>
  );
}

export default LandingPage;
