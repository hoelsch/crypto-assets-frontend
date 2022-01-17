import * as React from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DialogContentText from '@mui/material/DialogContentText';

export default function SuccessDialog(props) {
  return (
    <>
      <CheckCircleIcon color="success" sx={{ fontSize: 80, textAlign: "center", width: 1}}/>
      <DialogContentText sx={{mt: 1, textAlign: "center"}}>
        {props.message}
      </DialogContentText>
    </>
  );
}
