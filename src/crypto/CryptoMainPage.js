import React from 'react';

import axios from 'axios';

import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Crypto from './Crypto';
import CryptoList from './CryptoList';
import CryptoAddDialog from './CryptoAddDialog';

import { PieChart } from 'react-minimal-pie-chart';

const primaryButtonStyle = makeStyles({
  root: {
    background: '#BB86FC',
  },
});

const secondaryButtonStyle = makeStyles({
  root: {
    background: '#03DAC6',
  },
});

function CryptoMainPage(props) {
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [assets, setAssets] = React.useState([]);
  
  const primaryButton = primaryButtonStyle();
  const secondaryButton = secondaryButtonStyle();

  const config = {
    headers: {
       Authorization: "Bearer " + props.token,
    }
  };
  
  React.useEffect(() => {
    if (assets.length > 0) {
      return
    }  
    
    fetchAssets()
  });

  const fetchAssets = () => {
    axios.get('http://localhost:8080/assets', config)
      .then((response) => {
        if (response.data.assets.length > 0) {
          fetchCrypoPrices(response.data.assets)
        }
      })
      .catch(err => {
        // TODO: implement error handling
      });
  }

  const fetchCrypoPrices = (assets) => {
    axios.get('https://api.binance.com/api/v3/ticker/price')
      .then((response) => {
        let cryptos = response.data
        
        for (let j = 0; j < assets.length; j++) {
          let expectedSymbol = assets[j].Abbreviation + "EUR"
          
          for (let i = 0; i < cryptos.length; i++) {
            let symbol = cryptos[i]["symbol"]
            if (symbol === expectedSymbol) {
              let amount = parseFloat(assets[j].Amount);
              let currentPrice = parseFloat(cryptos[i]["price"]);
              let totalPrice = amount * currentPrice;
              
              assets[j]["CurrentPrice"] = currentPrice;
              assets[j]["TotalPrice"] = totalPrice.toFixed(2);
            }
          }
        }

        setAssets(assets);
      });
  };

  const getPieChartContent = () => {
    if (assets.length === 0) {
      return
    }
    let colors = ["rgb(49,32,227)", "rgb(144,54,170)", "rgb(198,52,97)", "rgb(242,156,56)", "rgb(242,156,56)"];
    let content = [];

    for (let i = 0; i < assets.length; i++) {
      var hue = Math.floor(Math.random() * 360);
      var randomColor = 'hsl(' + hue + ', 100%, 80%)';

      content.push({ title: assets[i].Abbreviation, value: parseInt(assets[i].TotalPrice), color: colors[i] });
    }

    return content
  };

  return (
    <>
      <Box p={4}>
        <Grid container>
          <Grid item container direction="row" justifyContent="flex-end" alignItems="flex-start" spacing={2} p={1}>
            <Grid item>
              <Fab className={primaryButton.root} aria-label="add" onClick={() => setOpenAddDialog(true)}>
                <AddIcon />
              </Fab>
            </Grid>
            <Grid item>
              <Fab className={secondaryButton.root} aria-label="edit">
                <EditIcon />
              </Fab>
            </Grid>
          </Grid>
          <Grid item container direction="row" justifyContent="center" alignItems="center">
            <PieChart
              style={{ height: '200px', marginBottom: "30px" }}
              lineWidth={20}
              data={getPieChartContent()}
            />
            <CryptoList assets={assets}/>
          </Grid>
        </Grid>
      </Box>
      <CryptoAddDialog open={openAddDialog} setOpenAddDialog={setOpenAddDialog} fetchAssets={fetchAssets} token={props.token} />
    </>
  )
}
  
export default CryptoMainPage;
