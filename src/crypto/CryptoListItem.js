import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";

import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function CryptoListItem(props) {
  /*return (
    <MyListItem>
      <ListItemAvatar>
        <Avatar src={props.crypto.logoUrl} />
      </ListItemAvatar>
      <ListItemText 
        primary={props.crypto.name}
        secondary={<Typography style={{ color: 'rgb(255, 255, 255, 0.8)', fontSize: 12 }}>{props.crypto.shortName}</Typography>} 
      />
      <Typography style={{ color: 'rgb(255, 255, 255)', fontSize: 20, marginRight: 20 }}>
        {props.crypto.price}
      </Typography>
    </MyListItem>
  )*/

  /*const MyListItem = styled(ListItem)({
    background: 'rgb(30, 30, 30)',
    //border: 0,
    borderLeftWidth: 5,
    borderLeftStyle: "solid",
    borderRadius: 8,
    borderLeftColor: props.asset.Color,
    color: 'white',
    height: 100,
    width: 400,
    padding: '0 30px',
    margin: 10,
  });*/
  
  const StyledLinearProgress = withStyles({
    colorPrimary: {
      //backgroundColor: "rgba(255, 255, 255, 0.7)"
      backgroundColor: "white"
    },
    barColorPrimary: {
      backgroundColor: props.asset.Color
    }
  })(LinearProgress);

  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <StyledLinearProgress variant="determinate" value={50} />
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
      background: 'rgb(30, 30, 30)',
      border: 0,
      borderRadius: 8,
      color: 'white',
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
          secondary={<Typography style={{ color: 'rgb(255, 255, 255, 0.8)', fontSize: 12 }}>{props.asset.Abbreviation}</Typography>} 
        />
        <ListItemText 
          primary={props.asset.TotalPrice}
          secondary={<Typography style={{ color: 'rgb(255, 255, 255, 0.8)', fontSize: 12 }}>Euro (€)</Typography>} 
        />
      </ListItem>
      <LinearProgressWithLabel value={50} />
    </div>
  )
}

export default CryptoListItem;