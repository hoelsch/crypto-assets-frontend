import React from "react";

import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

import LinearProgressWithLabel from "./LinearProgressWithLabel";

function AssetsListItem(props) {
  const style = {
    background: "white",
    border: 0,
    borderRadius: 8,
    color: "rgb(50,61,73)",
    height: 100,
    width: 400,
    padding: "20px",
    margin: 12,
  };

  return (
    <div style={style}>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={props.asset.IconUrl} />
        </ListItemAvatar>
        <ListItemText primary={props.asset.CryptoName} />
        <ListItemText
          primary={props.asset.Amount}
          secondary={
            <Typography style={{ color: "rgb(50,61,73)", fontSize: 12 }}>
              {props.asset.Abbreviation}
            </Typography>
          }
        />
        <ListItemText
          primary={props.asset.TotalPrice}
          secondary={
            <Typography style={{ color: "rgb(50,61,73)", fontSize: 12 }}>
              Euro (€)
            </Typography>
          }
        />
      </ListItem>
      <LinearProgressWithLabel
        value={props.asset.PercentageAmongAllAssets}
        barColor={props.asset.Color}
      />
    </div>
  );
}

export default AssetsListItem;
