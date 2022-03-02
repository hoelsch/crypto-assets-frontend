import React from "react";

import Button from "@mui/material/Button";

function LogoutButton(props) {
  const style = {
    p: 1,
    position: "fixed",
    top: 35,
    right: 35,
  };

  return (
    <Button sx={style} variant="text" onClick={props.handleClickLogout}>
      Logout
    </Button>
  );
}

export default LogoutButton;
