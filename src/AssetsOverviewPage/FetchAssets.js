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
        fetchCrypoPrices(assetsFromServer, setAssets);

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

function fetchCrypoPrices(assets, setAssets) {
  axios.get("https://api.binance.com/api/v3/ticker/price").then((response) => {
    let cryptos = response.data;

    for (let j = 0; j < assets.length; j++) {
      let expectedSymbol = assets[j].Abbreviation + "EUR";

      for (let i = 0; i < cryptos.length; i++) {
        let symbol = cryptos[i]["symbol"];
        if (symbol === expectedSymbol) {
          let amount = parseFloat(assets[j].Amount);
          let currentPrice = parseFloat(cryptos[i]["price"]);
          let totalPrice = amount * currentPrice;

          assets[j]["CurrentPrice"] = currentPrice;
          assets[j]["TotalPrice"] = totalPrice.toFixed(2);

          // "bitcoin": "#CF6679", "ethereum": "rgb(178,139,245)", "cardano": "rgb(98,215,198)"
          let colors = {
            bitcoin: "rgb(98,215,198)",
            ethereum: "rgb(178,139,245)",
            cardano: "#CF6679",
          };
          assets[j]["Color"] = colors[assets[j].CryptoName];
        }
      }
    }

    let total = 0;
    for (let i = 0; i < assets.length; i++) {
      total += parseFloat(assets[i].TotalPrice);
    }

    for (let i = 0; i < assets.length; i++) {
      assets[i]["PercentageAmongAllAssets"] = (
        (parseFloat(assets[i].TotalPrice) / parseFloat(total)) *
        100
      ).toFixed(2);
    }

    setAssets(assets);
  });
}

export default fetchAssets;
