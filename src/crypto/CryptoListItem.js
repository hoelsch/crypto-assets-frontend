import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";

import LinearProgress from '@mui/material/LinearProgress';
import ColoredLinearProgress from './ColoredLinearProgress.js';
import Box from '@mui/material/Box';

function CryptoListItem(props) {
  const barColor = props.asset.Color;

  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <ColoredLinearProgress value={props.value} progressColor={barColor}/>
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }
  
  return (
    <div style={{
      background: 'white',
      border: 0,
      borderRadius: 8,
      color: 'rgb(50,61,73)',
      height: 100,
      width: 400,
      padding: '20px',
      margin: 12,
    }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={props.asset.IconUrl} />
        </ListItemAvatar>
        <ListItemText 
          primary={props.asset.CryptoName}
        />
        <ListItemText 
          primary={props.asset.Amount}
          secondary={<Typography style={{ color: 'rgb(50,61,73)', fontSize: 12 }}>{props.asset.Abbreviation}</Typography>} 
        />
        <ListItemText 
          primary={props.asset.TotalPrice}
          secondary={<Typography style={{ color: 'rgb(50,61,73)', fontSize: 12 }}>Euro (€)</Typography>} 
        />
      </ListItem>
      <LinearProgressWithLabel value={props.asset.PercentageAmongAllAssets} />
    </div>
  )
}

export default CryptoListItem;
