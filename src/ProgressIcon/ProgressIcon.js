import * as React from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function ProgressIcon() {
  return (
    <Box sx={{ mx: "auto", mt: 4, textAlign: "center"}}>
      <CircularProgress/>
    </Box>
  );
}

export default ProgressIcon;
