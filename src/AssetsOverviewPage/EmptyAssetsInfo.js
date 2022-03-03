import React from "react";

import Box from "@mui/material/Box";

function EmptyAssetsInfo(props) {
  const style = {
    height: 100,
    width: 350,
    backgroundColor: "white",
    ml: "auto",
    mr: "auto",
    textAlign: "center",
    p: 10,
    borderRadius: 8,
  };

  return (
    <Box sx={style}>
      <h2>No Crypto added to Assets yet</h2>
      Press top left Button to add Crypto
    </Box>
  );
}

export default EmptyAssetsInfo;
