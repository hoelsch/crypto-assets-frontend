import * as React from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function CryptoSelect(props) {
  return (
    <>
      <InputLabel id="crypto-type-select-label">Type</InputLabel>
      <Select
        labelId="crypto-type-select-label"
        id="crypto-type-select"
        value={props.selectedCrypto}
        label="Crypto-Type"
        onChange={props.handleCryptoChange}
      >
        {getCryptoTypeList(props.supportedCryptos)}
      </Select>
    </>
  );
}

function getCryptoTypeList(supportedCryptos) {
  const cryptoTypes = [];

  for (let i = 0; i < supportedCryptos.length; i++) {
    cryptoTypes.push(
      <MenuItem key={i} sx={{ display: "block" }} value={supportedCryptos[i]}>
        {supportedCryptos[i]}
      </MenuItem>
    );
  }

  return cryptoTypes;
}

export default CryptoSelect;
