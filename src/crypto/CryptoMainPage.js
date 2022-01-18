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

  const updateAsset = (cryptoType, amount) => {
    let newAssets = [...assets]
    for (let i = 0; i < newAssets.length; i++) {
      // TODO: make it consistent (either use crypto name or type, but not both)
      if (newAssets[i].CryptoName === cryptoType) {
        newAssets[i].Amount += amount;
        break;
      }
    }

    setAssets(newAssets)
  };
  
  React.useEffect(() => {
    if (assets.length > 0) {
      return
    }  
  
    axios.get('http://localhost:8080/assets', config)
      .then((response) => {
        if (response.data.assets.length > 0) {
          fetchCrypoPrices(response.data.assets)
        }
      })
      .catch(err => {
        // TODO: implement error handling
      });
  });

  const fetchCrypoPrices = (assets) => {
    axios.get('https://api.binance.com/api/v3/ticker/price')
      .then((response) => {
        let cryptos = response.data
        
        for (let j = 0; j < assets.length; j++) {
          let expectedSymbol = assets[j].Abbreviation + "EUR"
          
          for (let i = 0; i < cryptos.length; i++) {
            let symbol = cryptos[i]["symbol"]
            if (symbol === expectedSymbol) {
              let amount = parseFloat(assets[j].Amount)
              let currentPrice = parseFloat(cryptos[i]["price"])
              let totalPrice = amount * currentPrice
              
              assets[j]["Price"] = totalPrice.toFixed(2);
            } 
          }
        }

        setAssets(assets);
      });
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
              style={{ height: '200px' }}
              lineWidth={20}
              data={[
                { title: 'One', value: 10, color: '#E38627' },
                { title: 'Two', value: 15, color: '#C13C37' },
                { title: 'Three', value: 20, color: '#6A2135' },
              ]}
            />
            <CryptoList assets={assets}/>
          </Grid>
        </Grid>
      </Box>
      <CryptoAddDialog open={openAddDialog} setOpenAddDialog={setOpenAddDialog} updateAsset={updateAsset} token={props.token} />
    </>
  )
}
  
export default CryptoMainPage;
