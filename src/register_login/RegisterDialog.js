import * as React from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import axios from 'axios';

import ErrorText from '../ErrorText/ErrorText';
import ProgressIcon from '../ProgressIcon/ProgressIcon';
import SuccessDialog from '../SuccessDialog/SuccessDialog';

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export default function RegisterDialog() {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  
  const [userName, setUserName] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [userMail, setUserMail] = React.useState("");
  
  const [userNameError, setUserNameError] = React.useState("");
  const [mailError, setMailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  
  const handleClickOpen = () => {
    setError();
    setIsLoading(false)
    setIsSuccess(false)
    setOpen(true);

    setUserName("")
    setUserMail("")
    setUserPassword("")

    setUserNameError("")
    setMailError("")
    setPasswordError("")
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickRegister = () => {
    if (userNameError || passwordError || mailError) {
      return;
    }

    if (userName === "" || userMail === "" || userPassword === "") {
      return;
    }

    const user = {name: userName, mail: userMail, password: userPassword};

    setIsLoading(true)
    setError()

    // TODO: make URL configurable
    axios.post('http://localhost:8080/users', user)
        .then(() => {
          setIsLoading(false)
          setError(false);
          setIsSuccess(true)
        })
        .catch(err => {
          setIsLoading(false)
          setIsSuccess(false)

          if (err.response && err.response.data && err.response.data.error) {
            setError(err.response.data.error)
          } else {
            setError(err.message)
          }
        });
  };

  return (
    <>
      <Button sx={{mt:5, mr:5}} onClick={handleClickOpen}>Register</Button>
      <Dialog open={open} onClose={handleClose}>
        {!isSuccess && <DialogTitle>Register</DialogTitle>}
        <DialogContent>
          { !isSuccess &&
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
                onInput={e => {
                  const providedUserName = e.target.value;
                  if (providedUserName.length < 3) {
                    setUserNameError("User name must have at least 3 characters")
                  } else {
                    setUserName(providedUserName)
                    setUserNameError("")
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
                onInput={e => {
                  const providedUserMail = e.target.value;
                  if (!validateEmail(providedUserMail)) {
                    setMailError("Invalid mail address provided")
                  } else {
                    setUserMail(providedUserMail);
                    setMailError("")
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
                onInput={e => {
                  const providedUserPassword = e.target.value;
                  if (providedUserPassword.length < 8) {
                    setPasswordError("Password must have at least 8 characters")
                  } else {
                    setUserPassword(providedUserPassword);
                    setPasswordError("");
                  }
                }}
              />
            </>
          }
          {error && <ErrorText error={error} />}
          {isLoading && <ProgressIcon />}
          {isSuccess && <SuccessDialog message={"Successfully registered user"} />}
        </DialogContent>
        <DialogActions>
        {isSuccess && <Button onClick={handleClose}>Close</Button>}
        {!isSuccess &&
          <>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClickRegister}>Register</Button>
          </>
        }
        </DialogActions>
      </Dialog>
    </>
  );
}
