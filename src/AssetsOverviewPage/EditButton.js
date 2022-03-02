import React from "react";

import EditIcon from "@mui/icons-material/Edit";
import Fab from "@mui/material/Fab";

function EditButton(props) {
  const style = {
    background: "#03DAC6",
    "&:hover": { background: "#03DAC6" },
    "&:active": { background: "#03DAC666" },
  };

  return (
    <Fab
      sx={style}
      aria-label="edit"
      onClick={() => props.openEditDialog(true)}
    >
      <EditIcon />
    </Fab>
  );
}

export default EditButton;
