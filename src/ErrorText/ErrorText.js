import * as React from 'react';

import DialogContentText from '@mui/material/DialogContentText';

export default function ErrorText(props) {
  return (
    <DialogContentText sx={{mt: 4, color: "red"}}>
      {props.error}
    </DialogContentText>
  );
}
