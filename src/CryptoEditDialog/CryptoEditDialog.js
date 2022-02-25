import * as React from 'react';

import axios from 'axios';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import ProgressIcon from '../ProgressIcon/ProgressIcon';
import SuccessDialog from '../SuccessDialog/SuccessDialog';
import ErrorText from '../ErrorText/ErrorText';

export default function CryptoEditDialog(props) {
  const [assetsToUpdate, setAssetsToUpdate] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError] = React.useState();
  const [allAssetsDeleted, setAllAssetsDeleted] = React.useState(false);

  React.useEffect(() => {
    setAssetsToUpdate(props.assets)
  });

  const config = {
    headers: {
       Authorization: "Bearer " + props.token,
    }
  };
  
  const handleClose = () => {
    props.setOpenEditDialog(false);
    setIsSuccess(false);
    setIsLoading(false);
    setError();
    setAllAssetsDeleted(false);
  };

  const handleAssetDelete = (cryptoName) => {
    const newAssets = [...assetsToUpdate]
    for (let i = 0; i < newAssets.length; i++) {
      if (newAssets[i].CryptoName === cryptoName) {
        newAssets[i]["Deleted"] = true;
      }
    }

    let numDeletedAssets = 0
    for (let i = 0; i < newAssets.length; i++) {
      if (newAssets[i]["Deleted"]) {
        numDeletedAssets++;
      }
    }

    if (numDeletedAssets === newAssets.length) {
      setAllAssetsDeleted(true);
    }

    setAssetsToUpdate(newAssets)
  };

  const handleAmountChange = (cryptoName, amount) => {
    if (amount <= 0) {
      amount = 0;
      setError("Amount must be greater than zero")
    } else {
      setError()
    }

    const newAssets = [...assetsToUpdate]
    for (let i = 0; i < newAssets.length; i++) {
      if (newAssets[i].CryptoName === cryptoName) {
        newAssets[i].Amount = amount
        newAssets[i]["Updated"] = true
        break
      }
    }

    setAssetsToUpdate(newAssets)
  };

  const handleUpdateAssets = () => {
    setIsLoading(true);
    setError()
    
    const requests = []
    
    for (let i = 0; i < assetsToUpdate.length; i++) {
      const cryptoName = assetsToUpdate[i]["CryptoName"]
      
      if ("Updated" in assetsToUpdate[i]) {
        const amount = assetsToUpdate[i]["Amount"]
        requests.push(axios.put('http://localhost:8080/assets/' + cryptoName, {amount: amount}, config))
      } else if ("Deleted" in assetsToUpdate[i]) {
        requests.push(axios.delete('http://localhost:8080/assets/' + cryptoName, config))
      }
    };

    axios.all(requests)
      .then(() => {
        setIsLoading(false);
        setIsSuccess(true);
        props.fetchAssets();
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
      <Dialog open={props.open} onClose={handleClose} fullWidth={true} maxWidth={"xs"}>
      {!isSuccess && <DialogTitle>Edit your Assets</DialogTitle>}
        <DialogContent>
        { !isSuccess &&
          <List>
            {
              assetsToUpdate
                .filter((a) => !("Deleted" in a))
                .map((a) =>
              <ListItem
                secondaryAction={
                  <IconButton onClick={() => handleAssetDelete(a.CryptoName)} edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Paper elevation={0} sx={{mt: 4}}>{a.CryptoName}</Paper>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      sx={{width: 150}}
                      id="outlined-number"
                      label="Amount"
                      value={a.Amount}
                      type="number"
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: "0.1"
                      }}
                      onChange={(event) => handleAmountChange(a.CryptoName, parseFloat(event.target.value))}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              )
            }
          </List>
          }
          {allAssetsDeleted && !isSuccess && 
            "All cryptos in your assets were marked for deletion. Click 'Apply' to confirm the deletion, or 'Cancel' for aborting it"
          }
          {error && <ErrorText error={error} />}
          {isLoading && <ProgressIcon />}
          {isSuccess && <SuccessDialog message={"Successfully updated Assets"} />}
        </DialogContent>
        <DialogActions>
        {isSuccess && <Button onClick={handleClose}>Close</Button>}
        {!isSuccess &&
          <>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleUpdateAssets}>Apply</Button>
          </>
        }
        </DialogActions>
      </Dialog>
    </>
  )
}