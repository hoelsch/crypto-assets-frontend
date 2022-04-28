import * as React from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function CryptoSelect(props) {
  return (
    <>
      <InputLabel id="crypto-select-label">Crypto</InputLabel>
      <Select
        labelId="crypto-select-label"
        id="crypto-select"
        value={props.selectedCrypto}
        label="Crypto"
        onChange={props.handleCryptoChange}
      >
        {getCryptoItemList(props.supportedCryptos)}
      </Select>
    </>
  );
}

function getCryptoItemList(supportedCryptos) {
  const cryptoItems = [];

  for (let i = 0; i < supportedCryptos.length; i++) {
    cryptoItems.push(
      <MenuItem key={i} sx={{ display: "block" }} value={supportedCryptos[i]}>
        {supportedCryptos[i]}
      </MenuItem>
    );
  }

  return cryptoItems;
}

export default CryptoSelect;
