import * as React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

function CryptoEditForm(props) {
  return (
    <List>
      {props.assetsToUpdate
        .filter((a) => !("Deleted" in a))
        .map((a) => (
          <ListItem
            secondaryAction={
              <IconButton
                onClick={() => props.handleAssetDelete(a.CryptoName)}
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
                  {a.CryptoName}
                </Paper>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  sx={{ width: 150 }}
                  id="outlined-number"
                  label="Amount"
                  value={a.Amount}
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
                      a.CryptoName,
                      parseFloat(event.target.value)
                    )
                  }
                />
              </Grid>
            </Grid>
          </ListItem>
        ))}
    </List>
  );
}

export default CryptoEditForm;
