import * as React from "react";

import TextField from "@mui/material/TextField";

function LoginForm(props) {
  return (
    <>
      <TextField
        margin="dense"
        id="username"
        label="Username"
        type="text"
        fullWidth
        variant="standard"
        onInput={(e) => props.setUsername(e.target.value)}
      />
      <TextField
        margin="dense"
        id="password"
        label="Password"
        type="password"
        fullWidth
        variant="standard"
        onInput={(e) => props.setUserPassword(e.target.value)}
      />
    </>
  );
}

export default LoginForm;
