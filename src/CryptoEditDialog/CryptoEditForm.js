import * as React from "react";

import List from "@mui/material/List";

import CryptoEditFormListItem from "./CryptoEditFormListItem";

function CryptoEditForm(props) {
  return (
    <List>
      {props.assetsToDisplay.map((asset) => (
        <CryptoEditFormListItem
          asset={asset}
          handleAmountChange={props.handleAmountChange}
          handleAssetDelete={props.handleAssetDelete}
        />
      ))}
    </List>
  );
}

export default CryptoEditForm;
