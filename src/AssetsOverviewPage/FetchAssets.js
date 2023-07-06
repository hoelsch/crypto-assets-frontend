import axios from "axios";

import { BACKEND_URL } from "../config";

function fetchAssets(
  url,
  assets,
  setAssets,
  setShowEmtpyAssetsMessage,
  setError
) {
  axios
    .get(url, { withCredentials: true })
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
      setError("Error: Could not fetch assets from backend server");
    });
}

function updateAssetsWithCurrentCryptoPrices(fetchedAssets, setAssets) {
  const promises = [];

  for (let asset of fetchedAssets) {
    const promise = axios
      .get(`${BACKEND_URL}/cryptos/${asset.crypto_name}/price`, { withCredentials: true })
      .then((response) => {
        const price = response.data["price"];

        const currentPrice = parseFloat(price);
        const amount = parseFloat(asset.amount);
        const totalPrice = amount * currentPrice;

        asset["CurrentPrice"] = currentPrice;
        asset["TotalPrice"] = totalPrice.toFixed(2);
      });

    promises.push(promise);
  }

  Promise.all(promises)
    .then(() => {
      const totalBalance = getTotalBalance(fetchedAssets);

      for (let asset of fetchedAssets) {
        asset["PercentageAmongAllAssets"] = (
          (parseFloat(asset.TotalPrice) / parseFloat(totalBalance)) *
          100
        ).toFixed(2);
      }

      setAssets(fetchedAssets);
    })
}

function getTotalBalance(assets) {
  let total = 0;
  for (const asset of assets) {
    total += parseFloat(asset.TotalPrice);
  }

  return total;
}

function setColorFor(fetchedAssets) {
  const colors = {
    bitcoin: "rgb(98,215,198)",
    ethereum: "rgb(178,139,245)",
    cardano: "#CF6679",
  };

  for (let asset of fetchedAssets) {
    asset["Color"] = colors[asset.crypto_name];
  }
}

export default fetchAssets;
