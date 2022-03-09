import axios from "axios";

function fetchAssets(
  url,
  config,
  assets,
  setAssets,
  setShowEmtpyAssetsMessage
) {
  axios
    .get(url, config)
    .then((response) => {
      const assetsFromServer = response.data.assets;

      if (assetsFromServer && assetsFromServer.length > 0) {
        setShowEmtpyAssetsMessage(false);
        setColorFor(assetsFromServer);
        updateAssetsWithCurrentCryptoPrices(assetsFromServer, setAssets);

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
}

function getCryptoInfoForAsset(asset, cryptoInfos) {
  let expectedSymbol = asset.Abbreviation + "EUR";
  
  for (let i = 0; i < cryptoInfos.length; i++) {
    let symbol = cryptoInfos[i]["symbol"];
    if (symbol === expectedSymbol) {
      return cryptoInfos[i]
    }
  }

  // TODO: handle error when no crypto info found for asset
}

// TODO: move this function to a different location;
//       it could be confusing if the color how a crypto asset is displayed is set in this file
function setColorFor(fetchedAssets) {
  const colors = {
    bitcoin: "rgb(98,215,198)",
    ethereum: "rgb(178,139,245)",
    cardano: "#CF6679",
  };
  
  for (let asset of fetchedAssets) {
    asset["Color"] = colors[asset.CryptoName];
  }
}

function updateAssetsWithCurrentCryptoPrices(fetchedAssets, setAssets) {
  axios.get("https://api.binance.com/api/v3/ticker/price").then((response) => {
    const cryptoInfos = response.data;

    for (let asset of fetchedAssets) {
      const info = getCryptoInfoForAsset(asset, cryptoInfos)
      const currentPrice = parseFloat(info["price"]);
      
      const amount = parseFloat(asset.Amount);
      const totalPrice = amount * currentPrice;

      asset["CurrentPrice"] = currentPrice;
      asset["TotalPrice"] = totalPrice.toFixed(2);
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
}

export default fetchAssets;
