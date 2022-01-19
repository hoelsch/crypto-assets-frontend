import * as React from 'react';

import axios from 'axios';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';

import CryptoTypeSelect from './CryptoTypeSelect';
import ProgressIcon from '../ProgressIcon/ProgressIcon';
import SuccessDialog from '../SuccessDialog/SuccessDialog';
import ErrorText from '../ErrorText/ErrorText';

export default function CryptoAddDialog(props) {
  const [supportedCryptos, setSupportedCryptos] = React.useState([]);
  const [cryptoType, setCryptoType] = React.useState("");
  const [amount, setAmount] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError] = React.useState();
  
  const config = {
    headers: {
       Authorization: "Bearer " + props.token,
    }
  };

  const handleClose = () => {
    props.setOpenAddDialog(false);
    setIsSuccess(false);
    setIsLoading(false);
    setError();
  };

  const handleAdd = () => {
    setIsLoading(true);
    
    axios.post('http://localhost:8080/assets/' + cryptoType, {amount: amount}, config)
      .then(() => {
        setIsLoading(false);
        setIsSuccess(true);
        props.fetchAssets();
      })
      .catch(err => {
        setIsLoading(false);
        setIsSuccess(false);
        setError(err.message);
      });
  };

  const handleCryptoTypeChange = (event) => {
    setCryptoType(event.target.value.toLowerCase());
  };

  const handleAmountChange = (event) => {
    if (event.target.value < 0) {
      event.target.value = 0;
    } 

    setAmount(parseFloat(event.target.value));
  };

  if (supportedCryptos.length == 0) {
    fetchSupportedCryptos(setSupportedCryptos, setError, config);
  }
  
  return (
    <>
      <Dialog open={props.open} onClose={handleClose} fullWidth={true} maxWidth={"xs"}>
      {!isSuccess && <DialogTitle>Add Crypto to your Assets</DialogTitle>}
        <DialogContent>
          { !isSuccess &&
            <FormControl sx={{ minWidth: 150, m: 2}}>
              <CryptoTypeSelect 
                supportedCryptos={supportedCryptos}
                selectedCryptoType={cryptoType}
                handleCryptoTypeChange={handleCryptoTypeChange}
              />
              <TextField
                id="outlined-number"
                label="Amount"
                value={amount}
                type="number"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleAmountChange}
              />
            </FormControl>
          }
          {error && <ErrorText error={error} />}
          {isLoading && <ProgressIcon />}
          {isSuccess && <SuccessDialog message={"Successfully added " + cryptoType + " to Assets"} />}
        </DialogContent>
        <DialogActions>
          {isSuccess && <Button onClick={handleClose}>Close</Button>}
          {!isSuccess &&
            <>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleAdd}>Add</Button>
            </>
          }
        </DialogActions>
      </Dialog>
    </>
  )
}

function fetchSupportedCryptos(setSupportedCryptos, setError, config) {
  axios.get('http://localhost:8080/cryptos', config)
    .then((response) => {
      const responseData = response.data["cryptos"]
      const cryptos = []

      for (let i = 0; i < responseData.length; i++) {
        const crypto = responseData[i];
        cryptos.push(crypto["Name"])
      }

      setSupportedCryptos(cryptos)
    })
    .catch(err => {
      setError(err.message);
    });
}
