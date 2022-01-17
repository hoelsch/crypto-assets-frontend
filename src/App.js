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

  if (jwt) {
    return (
      <>
        <Button variant="outlined" onClick={handleClickLogut}>Logout</Button>
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
