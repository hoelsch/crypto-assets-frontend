import * as React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import axios from "axios";

import ErrorText from "../ErrorText/ErrorText";
import ProgressIcon from "../ProgressIcon/ProgressIcon";
import LoginForm from "./LoginForm";

function LoginDialog(props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState();

  const [userPassword, setUserPassword] = React.useState("");
  const [userMail, setUserMail] = React.useState("");

  const handleClickClose = () => {
    props.handleClose();
    
    setError();
    setIsLoading(false);

    setUserMail("");
    setUserPassword("");
  };

  const handleClickLogin = () => {
    const user = { mail: userMail, password: userPassword };

    setIsLoading(true);
    setError();

    // TODO: make URL configurable
    axios
      .post("http://localhost:8080/login", user)
      .then((response) => {
        const jwtToken = response.data.token;
        props.handleLoginSuccess(jwtToken);

        setIsLoading(false);
        setError(false);
      })
      .catch((err) => {
        setIsLoading(false);

        if (err.response && err.response.data && err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError(err.message);
        }
      });
  };

  return (
    <Dialog open={props.open} onClose={handleClickClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <LoginForm
          setUserMail={setUserMail}
          setUserPassword={setUserPassword}
        />
        {error && <ErrorText error={error} />}
        {isLoading && <ProgressIcon />}
      </DialogContent>
      <DialogActions>
        <>
          <Button onClick={handleClickClose}>Cancel</Button>
          <Button onClick={handleClickLogin}>Login</Button>
        </>
      </DialogActions>
    </Dialog>
  );
}

export default LoginDialog;
