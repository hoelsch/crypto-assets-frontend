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

import CryptoTypeSelect from './CryptoTypeSelect';
import ProgressIcon from '../ProgressIcon/ProgressIcon';
import SuccessDialog from '../SuccessDialog/SuccessDialog';
import ErrorText from '../ErrorText/ErrorText';

export default function CryptoEditDialog(props) {
  const [assetsToUpdate, setAssetsToUpdate] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

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
  };

  const handleAssetDelete = (cryptoName) => {
    const newAssets = [...assetsToUpdate]
    for (let i = 0; i < newAssets.length; i++) {
      if (newAssets[i].CryptoName === cryptoName) {
        newAssets[i]["Deleted"] = true;
      }
    }

    setAssetsToUpdate(newAssets)
  };

  const handleAmountChange = (cryptoName, amount) => {
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
                {a.CryptoName}
                <TextField
                  id="outlined-number"
                  label="Amount"
                  value={a.Amount}
                  type="number"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event) => handleAmountChange(a.CryptoName, parseFloat(event.target.value))}
                />
              </ListItem>
              )
            }
          </List>
          }
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
