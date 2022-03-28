import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';

function ColoredLinearProgress(props) {
  const StyledLinearProgress = withStyles({
    colorPrimary: {
      backgroundColor: "rgb(240,240,240)"
    },
    barColorPrimary: {
      backgroundColor: props.progressColor
    }
  })(LinearProgress)

  return (<StyledLinearProgress variant="determinate" value={props.value} />)
}

export default ColoredLinearProgress;
