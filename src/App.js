import React from 'react';

import Button from '@mui/material/Button';
import RegisterDialog from './register_login/RegisterDialog';
import LoginDialog from './register_login/LoginDialog';
import CryptoMainPage from './crypto/CryptoMainPage';

function App() {
  const storedJwt = localStorage.getItem('token');
  const [jwt, setJwt] = React.useState(storedJwt);

  const handleClickLogut = () => {
    localStorage.removeItem('token')
    setJwt(null)
  };

  const handleLoginSuccess = (token) => {
    localStorage.setItem('token', token)
    setJwt(token)
  };

  //<Button sx={{ p: 30 }} variant="outlined" onClick={handleClickLogut}>Logout</Button>
  if (jwt) {
    return (
      <>
        <CryptoMainPage token={jwt}/>
      </>
    );
  }

  return (
    <>
      Your crypto assets in one place
      <RegisterDialog />
      <LoginDialog handleLoginSuccess={handleLoginSuccess} />
    </>
  );
}

export default App;
