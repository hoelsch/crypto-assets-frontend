import React from "react";

import List from "@material-ui/core/List";

import AssetsListItem from "./AssetsListItem";

function AssetsList(props) {
  return (
    <List>
      {props.assets.map((asset) => (
        <AssetsListItem key={asset.CryptoName} asset={asset} />
      ))}
    </List>
  );
}

export default AssetsList;
