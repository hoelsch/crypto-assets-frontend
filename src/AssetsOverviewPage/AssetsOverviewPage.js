import React from "react";

import axios from "axios";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import AddButton from "./AddButton";
import EditButton from "./EditButton";
import LogoutButton from "./LogoutButton";

import AssetsPieChart from "./AssetsPieChart";
import EmptyAssetsInfo from "./EmptyAssetsInfo";

import CryptoList from "./../CryptoList/CryptoList";
import CryptoAddDialog from "./../CryptoAddDialog/CryptoAddDialog";
import CryptoEditDialog from "./../CryptoEditDialog/CryptoEditDialog";

import getAuthHeaderConfig from "../Authorization/Authorization";

function AssetsOverviewPage(props) {
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [assets, setAssets] = React.useState([]);
  const [showEmtpyAssetsMessage, setShowEmtpyAssetsMessage] =
    React.useState(false);

  const config = getAuthHeaderConfig(props.token);

  React.useEffect(() => {
    if (assets.length > 0) {
      return;
    }

    fetchAssets();
  });

  const fetchAssets = () => {
    axios
      .get("http://localhost:8080/assets", config)
      .then((response) => {
        const assetsFromServer = response.data.assets;
        
        if (assetsFromServer && assetsFromServer.length > 0) {
          setShowEmtpyAssetsMessage(false);
          fetchCrypoPrices(assetsFromServer);

          return;
        }

        if (assets.length > 0) {
          setAssets([]);
        }

        setShowEmtpyAssetsMessage(true);
      })
      .catch((err) => {
        // TODO: implement error handling
      });
  };

  const fetchCrypoPrices = (fetchedAssets) => {
    axios
      .get("https://api.binance.com/api/v3/ticker/price")
      .then((response) => {
        let cryptos = response.data;

        for (let j = 0; j < fetchedAssets.length; j++) {
          let expectedSymbol = fetchedAssets[j].Abbreviation + "EUR";

          for (let i = 0; i < cryptos.length; i++) {
            let symbol = cryptos[i]["symbol"];
            if (symbol === expectedSymbol) {
              let amount = parseFloat(fetchedAssets[j].Amount);
              let currentPrice = parseFloat(cryptos[i]["price"]);
              let totalPrice = amount * currentPrice;

              fetchedAssets[j]["CurrentPrice"] = currentPrice;
              fetchedAssets[j]["TotalPrice"] = totalPrice.toFixed(2);

              // "bitcoin": "#CF6679", "ethereum": "rgb(178,139,245)", "cardano": "rgb(98,215,198)"
              let colors = {
                bitcoin: "rgb(98,215,198)",
                ethereum: "rgb(178,139,245)",
                cardano: "#CF6679",
              };
              fetchedAssets[j]["Color"] = colors[fetchedAssets[j].CryptoName];
            }
          }
        }

        let total = 0;
        for (let i = 0; i < fetchedAssets.length; i++) {
          total += parseFloat(fetchedAssets[i].TotalPrice);
        }

        for (let i = 0; i < fetchedAssets.length; i++) {
          fetchedAssets[i]["PercentageAmongAllAssets"] = (
            (parseFloat(fetchedAssets[i].TotalPrice) / parseFloat(total)) *
            100
          ).toFixed(2);
        }

        setAssets(fetchedAssets);
      });
  };

  const getCopyOfAssetsForEdit = () => {
    const assetsCopy = [];
    for (let i = 0; i < assets.length; i++) {
      const a = assets[i];
      assetsCopy.push({ CryptoName: a.CryptoName, Amount: a.Amount });
    }

    return assetsCopy;
  };

  return (
    <>
      <LogoutButton handleClickLogout={props.handleClickLogout} />
      <Box p={4}>
        <Grid container>
          <Grid
            item
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
            p={1}
          >
            <Grid item>
              <AddButton openAddDialog={setOpenAddDialog} />
            </Grid>
            {!showEmtpyAssetsMessage && assets.length > 0 && (
              <Grid item>
                <EditButton openEditDialog={setOpenEditDialog} />
              </Grid>
            )}
          </Grid>
          <Grid
            item
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <AssetsPieChart assets={assets} />
            <CryptoList assets={assets} />
            {showEmtpyAssetsMessage && <EmptyAssetsInfo />}
          </Grid>
        </Grid>
      </Box>
      <CryptoAddDialog
        open={openAddDialog}
        setOpenAddDialog={setOpenAddDialog}
        fetchAssets={fetchAssets}
        token={props.token}
      />
      <CryptoEditDialog
        open={openEditDialog}
        setOpenEditDialog={setOpenEditDialog}
        fetchAssets={fetchAssets}
        assets={getCopyOfAssetsForEdit()}
        token={props.token}
      />
    </>
  );
}

export default AssetsOverviewPage;
