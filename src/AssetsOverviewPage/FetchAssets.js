import axios from "axios";

function fetchAssets(
  url,
  config,
  assets,
  setAssets,
  setShowEmtpyAssetsMessage,
  setError
) {
  axios
    .get(url, config)
    .then((response) => {
      setError(); // request was successful, reset previous error message

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
      setError("Error: Could not fetch assets. Please refresh the page");
    });
}

function getCryptoInfoForAsset(asset, cryptoInfos) {
  const expectedSymbol = asset.Abbreviation + "EUR";

  for (const info of cryptoInfos) {
    const symbol = info["symbol"];

    if (symbol === expectedSymbol) {
      return info;
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

function updateAssetPrice(asset, cryptoInfos) {
  const info = getCryptoInfoForAsset(asset, cryptoInfos);
  const currentPrice = parseFloat(info["price"]);

  const amount = parseFloat(asset.Amount);
  const totalPrice = amount * currentPrice;

  asset["CurrentPrice"] = currentPrice;
  asset["TotalPrice"] = totalPrice.toFixed(2);
}

function getTotalBalance(assets) {
  let total = 0;
  for (const asset of assets) {
    total += parseFloat(asset.TotalPrice);
  }

  return total;
}

function updateAssetsWithCurrentCryptoPrices(fetchedAssets, setAssets) {
  axios.get("https://api.binance.com/api/v3/ticker/price").then((response) => {
    const cryptoInfos = response.data;

    for (let asset of fetchedAssets) {
      updateAssetPrice(asset, cryptoInfos);
    }

    const totalBalance = getTotalBalance(fetchedAssets);

    for (let asset of fetchedAssets) {
      asset["PercentageAmongAllAssets"] = (
        (parseFloat(asset.TotalPrice) / parseFloat(totalBalance)) *
        100
      ).toFixed(2);
    }

    setAssets(fetchedAssets);
  });
}

export default fetchAssets;
