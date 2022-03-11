import * as React from "react";

import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

import CryptoTypeSelect from "./CryptoTypeSelect";

function CryptoAddForm(props) {
  return (
    <FormControl sx={{ minWidth: 150, m: 2 }}>
      <CryptoTypeSelect
        supportedCryptos={props.supportedCryptos}
        selectedCryptoType={props.cryptoType}
        handleCryptoTypeChange={props.handleCryptoTypeChange}
      />
      <TextField
        id="outlined-number"
        label="Amount"
        value={props.amount}
        type="number"
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: "0.1",
        }}
        onChange={props.handleAmountChange}
      />
    </FormControl>
  );
}

export default CryptoAddForm;
