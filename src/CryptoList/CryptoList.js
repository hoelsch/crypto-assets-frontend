import React from "react";

import List from "@material-ui/core/List";

import CryptoListItem from "./CryptoListItem";

function CryptoList(props) {
  return (
    <List>
      {props.assets.map((a) => (
        <CryptoListItem asset={a} />
      ))}
    </List>
  );
}

export default CryptoList;
