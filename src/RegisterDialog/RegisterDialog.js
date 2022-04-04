import * as React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import axios from "axios";

import validateMailAddress from "./Mail";
import ErrorText from "../ErrorText/ErrorText";
import ProgressIcon from "../ProgressIcon/ProgressIcon";
import SuccessDialog from "../SuccessDialog/SuccessDialog";

function RegisterDialog(props) {
  const [error, setError] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const [userName, setUserName] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [userMail, setUserMail] = React.useState("");

  const [userNameError, setUserNameError] = React.useState("");
  const [mailError, setMailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const handleClickClose = () => {
    props.handleClose();
    setError();
    setIsLoading(false);
    setIsSuccess(false);

    setUserName("");
    setUserMail("");
    setUserPassword("");

    setUserNameError("");
    setMailError("");
    setPasswordError("");
  };

  const handleClickRegister = () => {
    if (userNameError || passwordError || mailError) {
      return;
    }

    if (userName === "" || userMail === "" || userPassword === "") {
      return;
    }

    const user = { name: userName, mail: userMail, password: userPassword };

    setIsLoading(true);
    setError();

    // TODO: make URL configurable
    axios
      .post("http://localhost:8080/users", user)
      .then(() => {
        setIsLoading(false);
        setError(false);
        setIsSuccess(true);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsSuccess(false);

        if (err.response && err.response.data && err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError(err.message);
        }
      });
  };

  if (isSuccess) {
    return (
      <SuccessDialog
        message={"Successfully registered user"}
        open={props.open}
        handleClose={handleClickClose}
      />
    );
  }

  return (
    <Dialog open={props.open} onClose={handleClickClose}>
      <DialogTitle>Register</DialogTitle>
      <DialogContent>
        <>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="User Name"
            error={userNameError}
            helperText={userNameError}
            fullWidth
            variant="standard"
            onInput={(e) => {
              const providedUserName = e.target.value;
              if (providedUserName.length < 3) {
                setUserNameError("User name must have at least 3 characters");
              } else {
                setUserName(providedUserName);
                setUserNameError("");
              }
            }}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            error={mailError}
            helperText={mailError}
            fullWidth
            variant="standard"
            onInput={(e) => {
              const providedUserMail = e.target.value;
              if (!validateMailAddress(providedUserMail)) {
                setMailError("Invalid mail address provided");
              } else {
                setUserMail(providedUserMail);
                setMailError("");
              }
            }}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            error={passwordError}
            helperText={passwordError}
            type="password"
            fullWidth
            variant="standard"
            onInput={(e) => {
              const providedUserPassword = e.target.value;
              if (providedUserPassword.length < 8) {
                setPasswordError("Password must have at least 8 characters");
              } else {
                setUserPassword(providedUserPassword);
                setPasswordError("");
              }
            }}
          />
        </>
        {error && <ErrorText error={error} />}
        {isLoading && <ProgressIcon />}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickClose}>Cancel</Button>
        <Button onClick={handleClickRegister}>Register</Button>
      </DialogActions>
    </Dialog>
  );
}

export default RegisterDialog;
