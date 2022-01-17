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

export default function RegisterDialog() {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  
  var userName;
  var userPassword;
  var userMail;

  const handleClickOpen = () => {
    setError();
    setIsLoading(false)
    setIsSuccess(false)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickRegister = () => {
    const user = {name: userName, mail: userMail, password: userPassword};

    setIsLoading(true)

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
          setError(err.message)
        });
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>Register</Button>
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
                fullWidth
                variant="standard"
                onInput={e => userName = e.target.value}
              />
              <TextField
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
                onInput={e => userMail = e.target.value}
              />
              <TextField
                margin="dense"
                id="password"
                label="Password"
                type="password"
                fullWidth
                variant="standard"
                onInput={e => userPassword = e.target.value}
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
