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

export default function LoginDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const [userPassword, setUserPassword] = React.useState("");
  const [userMail, setUserMail] = React.useState("");

  const handleClickOpen = () => {
    setError();
    setIsLoading(false)
    setIsSuccess(false)
    setOpen(true);

    setUserMail("")
    setUserPassword("")
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickLogin = () => {
    const user = {mail: userMail, password: userPassword};

    setIsLoading(true)
    setError()

    // TODO: make URL configurable
    axios.post('http://localhost:8080/login', user)
        .then((response) => {
          const jwtToken = response.data.token;
          props.handleLoginSuccess(jwtToken)

          setIsLoading(false);
          setError(false);
          setIsSuccess(true)
        })
        .catch(err => {
          setIsLoading(false);
          setIsSuccess(false);
          
          if (err.response && err.response.data && err.response.data.error) {
            setError(err.response.data.error)
          } else {
            setError(err.message)
          }
        });
  };

  return (
    <>
      <Button sx={{mt:5}} variant="contained" onClick={handleClickOpen}>Login</Button>
      <Dialog open={open} onClose={handleClose}>
        {!isSuccess && <DialogTitle>Login</DialogTitle>}
        <DialogContent>
          {!isSuccess &&
            <>
              <TextField
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
                onInput={e => setUserMail(e.target.value)}
              />
              <TextField
                margin="dense"
                id="password"
                label="Password"
                type="password"
                fullWidth
                variant="standard"
                onInput={e => setUserPassword(e.target.value)}
              />
            </>
          }
          {error && <ErrorText error={error} />}
          {isLoading && <ProgressIcon />}
          {isSuccess && <SuccessDialog message={"Successfully logged in"} />}
        </DialogContent>
        <DialogActions>
        {isSuccess && <Button onClick={handleClose}>Close</Button>}
        {!isSuccess &&
          <>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClickLogin}>Login</Button>
          </>
        }
        </DialogActions>
      </Dialog>
    </>
  );
}
