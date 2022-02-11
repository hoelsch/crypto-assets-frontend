import React from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import RegisterDialog from './register_login/RegisterDialog';
import LoginDialog from './register_login/LoginDialog';
import CryptoMainPage from './crypto/CryptoMainPage';
import DeleteIcon from '@mui/icons-material/Delete';

import Image from './logo2.png'; // Import using relative path

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
        <CryptoMainPage token={jwt} handleClickLogut={handleClickLogut} />
      </>
    );
  }

  return (
    <Box sx={{ height: 300, width: 300, backgroundColor: "white", ml: "auto", mr: "auto", mt: 10, textAlign: "center", p: 10, borderRadius: 8 }}>
      <img src={Image} alt="Logo" style={{width: 200}}/>
      <h2>Your Crypto Assets in One Place</h2>
      <RegisterDialog />
      <LoginDialog handleLoginSuccess={handleLoginSuccess} />
    </Box>
  );
}

export default App;
