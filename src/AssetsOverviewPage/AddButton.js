import React from "react";

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

function AddButton(props) {
  const style = {
    background: "#BB86FC",
    "&:hover": { background: "#BB86FC" },
    "&:active": { background: "#BB86FC66" },
  };

  return (
    <Fab sx={style} aria-label="add" onClick={() => props.openAddDialog(true)}>
      <AddIcon />
    </Fab>
  );
}

export default AddButton;
