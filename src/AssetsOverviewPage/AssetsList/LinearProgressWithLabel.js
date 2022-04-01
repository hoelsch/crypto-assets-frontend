import React from "react";

import Box from "@mui/material/Box";
import Typography from "@material-ui/core/Typography";

import ColoredLinearProgress from "./ColoredLinearProgress.js";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <ColoredLinearProgress
          value={props.value}
          progressColor={props.barColor}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default LinearProgressWithLabel;
