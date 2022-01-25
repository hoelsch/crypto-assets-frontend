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
  const handleClose = () => {
    props.setOpenEditDialog(false);
  };

  return (
    <>
      <Dialog open={props.open} onClose={handleClose} fullWidth={true} maxWidth={"xs"}>
      <DialogTitle>Edit your Assets</DialogTitle>
        <DialogContent>
          <List>
            {
              props.assets.map((a) =>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
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
                />
              </ListItem>
              )
            }
          </List>
        </DialogContent>
        <DialogActions>
          <>
            <Button onClick={handleClose}>Cancel</Button>
          </>
        </DialogActions>
      </Dialog>
    </>
  )
}
