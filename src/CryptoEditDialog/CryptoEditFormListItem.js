import * as React from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

function CryptoEditFormListItem(props) {
  return (
    <ListItem
      secondaryAction={
        <IconButton
          onClick={() => props.handleAssetDelete(props.asset.crypto_name)}
          edge="end"
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper elevation={0} sx={{ mt: 4 }}>
            {props.asset.crypto_name}
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <TextField
            sx={{ width: 150 }}
            id="outlined-number"
            label="Amount"
            value={props.asset.amount}
            type="number"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: "0.1",
            }}
            onChange={(event) =>
              props.handleAmountChange(
                props.asset.crypto_name,
                parseFloat(event.target.value)
              )
            }
          />
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default CryptoEditFormListItem;
