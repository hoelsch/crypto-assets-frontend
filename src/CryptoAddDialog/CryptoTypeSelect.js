import * as React from 'react';

import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function CryptoTypeSelect(props) {
  return (
    <>
      <InputLabel id="crypto-type-select-label">Type</InputLabel>
      <Select
        labelId="crypto-type-select-label"
        id="crypto-type-select"
        value={props.selectedCryptoType}
        label="Crypto-Type"
        onChange={props.handleCryptoTypeChange}
      >
        {getCryptoTypeList(props.supportedCryptos)}
      </Select>
    </>
  )
}

function getCryptoTypeList(supportedCryptos) {
  const cryptoTypes = []

  for (let i = 0; i < supportedCryptos.length; i++) {
    cryptoTypes.push(
      <MenuItem key={i} sx={{display: "block"}} value={supportedCryptos[i]}>{supportedCryptos[i]}</MenuItem>
    );
  }
    
  return cryptoTypes
}
