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
import CryptoEditDialog from './CryptoEditDialog';

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
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
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

              //let colors = ["#f44336", "#ff9800", "#673ab7"];
              let colors = ["rgb(178,139,245)", "rgb(98,215,198)", "#CF6679"];
              assets[j]["Color"] = colors[j]
            }
          }
        }
        
        let total = 0;
        for (let i = 0; i < assets.length; i++) {
          total += parseFloat(assets[i].TotalPrice);
        }

        for (let i = 0; i < assets.length; i++) {
          assets[i]["PercentageAmongAllAssets"] =  ((parseFloat(assets[i].TotalPrice) /  parseFloat(total)) * 100).toFixed(2)
        }

        setAssets(assets);
      });
  };

  const getTotalAssetBalance = () => {
    let total = 0;
    
    for (let i = 0; i < assets.length; i++) {
      total += parseFloat(assets[i].TotalPrice);
    }

    return total.toFixed(2)
  };

  const getPieChartContent = () => {
    if (assets.length === 0) {
      return
    }

    let content = [];

    for (let i = 0; i < assets.length; i++) {
      content.push({ title: assets[i].Abbreviation, value: parseInt(assets[i].TotalPrice), color: assets[i].Color });
    }

    return content
  };

  const getCopyOfAssetsForEdit = () => {
    const assetsCopy = [];
    for (let i = 0; i < assets.length; i++) {
      const a = assets[i]
      assetsCopy.push({"CryptoName": a.CryptoName, "Amount": a.Amount});
    }

    return assetsCopy
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
              <Fab className={secondaryButton.root} aria-label="edit" onClick={() => setOpenEditDialog(true)}>
                <EditIcon />
              </Fab>
            </Grid>
          </Grid>
          <Grid item container direction="row" justifyContent="center" alignItems="center">
            <PieChart
              style={{ height: '200px', marginBottom: "30px" }}
              lineWidth={20}
              data={getPieChartContent()}
              label={() => {
                let total = getTotalAssetBalance()
                return "€" + total
              }}
              labelPosition={0}
              labelStyle={{
                fontSize: '10px',
                fill: '#fff',
              }}
            />
            <CryptoList assets={assets}/>
          </Grid>
        </Grid>
      </Box>
      <CryptoAddDialog open={openAddDialog} setOpenAddDialog={setOpenAddDialog} fetchAssets={fetchAssets} token={props.token} />
      <CryptoEditDialog open={openEditDialog} setOpenEditDialog={setOpenEditDialog} assets={getCopyOfAssetsForEdit()} token={props.token} />
    </>
  )
}
  
export default CryptoMainPage;
