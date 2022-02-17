import React from 'react';

import axios from 'axios';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';

import { makeStyles } from '@mui/styles';

import CryptoList from './CryptoList';
import CryptoAddDialog from './CryptoAddDialog';
import CryptoEditDialog from './CryptoEditDialog';

import Button from '@mui/material/Button';

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
  const [showEmtpyAssetsMessage, setShowEmtpyAssetsMessage] = React.useState(false);
  
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
        const assetsFromServer = response.data.assets
        if (assetsFromServer && assetsFromServer.length > 0) {
          setShowEmtpyAssetsMessage(false)
          fetchCrypoPrices(assetsFromServer)
        } else {
          if (assets.length > 0) {
            setAssets([])
          }
          
          setShowEmtpyAssetsMessage(true)
        }
        console.log("called fetch assets")
      })
      .catch(err => {
        console.log(err)
        // TODO: implement error handling
      });
  }

  const fetchCrypoPrices = (fetchedAssets) => {
    axios.get('https://api.binance.com/api/v3/ticker/price')
      .then((response) => {
        let cryptos = response.data
        
        for (let j = 0; j < fetchedAssets.length; j++) {
          let expectedSymbol = fetchedAssets[j].Abbreviation + "EUR"
          
          for (let i = 0; i < cryptos.length; i++) {
            let symbol = cryptos[i]["symbol"]
            if (symbol === expectedSymbol) {
              let amount = parseFloat(fetchedAssets[j].Amount);
              let currentPrice = parseFloat(cryptos[i]["price"]);
              let totalPrice = amount * currentPrice;

              fetchedAssets[j]["CurrentPrice"] = currentPrice;
              fetchedAssets[j]["TotalPrice"] = totalPrice.toFixed(2);

              let colors = {"bitcoin": "#CF6679", "ethereum": "rgb(178,139,245)", "cardano": "rgb(98,215,198)"};
              fetchedAssets[j]["Color"] = colors[fetchedAssets[j].CryptoName]
            }
          }
        }
        
        let total = 0;
        for (let i = 0; i < fetchedAssets.length; i++) {
          total += parseFloat(fetchedAssets[i].TotalPrice);
        }

        for (let i = 0; i < fetchedAssets.length; i++) {
          fetchedAssets[i]["PercentageAmongAllAssets"] =  ((parseFloat(fetchedAssets[i].TotalPrice) /  parseFloat(total)) * 100).toFixed(2)
        }

       setAssets(fetchedAssets)
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
      <Button sx={{ p: 1, position: "fixed", top: 35, right: 35}} variant="text" onClick={props.handleClickLogut}>Logout</Button>
      <Box p={4}>
        <Grid container>
          <Grid item container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={2} p={1}>
            <Grid item>
              <Fab sx={{background: '#BB86FC'}} aria-label="add" onClick={() => setOpenAddDialog(true)}>
                <AddIcon />
              </Fab>
            </Grid>
            { !showEmtpyAssetsMessage && assets.length > 0 &&
              <Grid item>
                <Fab sx={{background: '#03DAC6'}} className={secondaryButton.root} aria-label="edit" onClick={() => setOpenEditDialog(true)}>
                  <EditIcon />
                </Fab>
              </Grid>
            }
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
                fill: 'rgb(50,61,73)',
              }}
            />
            <CryptoList assets={assets}/>
            {  showEmtpyAssetsMessage &&
              <Box sx={{ height: 100, width: 350, backgroundColor: "white", ml: "auto", mr: "auto", textAlign: "center", p: 10, borderRadius: 8 }}>
                <h2>No Crypto added to Assets yet</h2>
                Press top left Button to add Crypto
              </Box>
            }
          </Grid>
        </Grid>
      </Box>
      <CryptoAddDialog open={openAddDialog} setOpenAddDialog={setOpenAddDialog} fetchAssets={fetchAssets} token={props.token} />
      <CryptoEditDialog open={openEditDialog} setOpenEditDialog={setOpenEditDialog} fetchAssets={fetchAssets} assets={getCopyOfAssetsForEdit()} token={props.token} />
    </>
  )
}
  
export default CryptoMainPage;
