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

import { BACKEND_URL } from "../config";

function LoginDialog(props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState();

  const [userPassword, setUserPassword] = React.useState("");
  const [username, setUsername] = React.useState("");

  const handleClickClose = () => {
    props.handleClose();

    setError();
    setIsLoading(false);

    setUsername("");
    setUserPassword("");
  };

  const handleClickLogin = () => {
    const user = { username: username, password: userPassword };

    setIsLoading(true);
    setError();

    axios
      .post(`${BACKEND_URL}/login`, user, { withCredentials: true })
      .then((response) => {
        const userId = response.data.user_id
        props.setUserId(userId);

        setIsLoading(false);
        setError(false);

        axios.defaults.withCredentials = true;
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
          setUsername={setUsername}
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
