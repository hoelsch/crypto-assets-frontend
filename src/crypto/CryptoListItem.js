import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';

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
  
  return (
    <MyListItem>
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
        primary={"TODO"}
        secondary={<Typography style={{ color: 'rgb(255, 255, 255, 0.8)', fontSize: 12 }}>Euro (€)</Typography>} 
      />
    </MyListItem>
  )
}

const MyListItem = styled(ListItem)({
  background: 'rgb(30, 30, 30)',
  border: 0,
  borderRadius: 8,
  color: 'white',
  height: 100,
  width: 400,
  padding: '0 30px',
  margin: 10,
});

export default CryptoListItem;
