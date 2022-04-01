import * as React from "react";

import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

function SuccessDialog(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      fullWidth={true}
      maxWidth={"xs"}
    >
      <DialogContent>
        <CheckCircleIcon
          color="success"
          sx={{ fontSize: 80, textAlign: "center", width: 1 }}
        />
        <DialogContentText sx={{ mt: 1, textAlign: "center" }}>
          {props.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SuccessDialog;
