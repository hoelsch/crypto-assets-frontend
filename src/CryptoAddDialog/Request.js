import axios from "axios";

function addCryptoToAssets(
  crypto,
  amount,
  config,
  fetchAssets,
  setIsLoading,
  setIsSuccess,
  setError
) {
  axios
    .post(
      "http://localhost:8080/assets/" + crypto,
      { amount: amount },
      config
    )
    .then(() => {
      setIsLoading(false);
      setIsSuccess(true);
      fetchAssets();
    })
    .catch((err) => {
      setIsLoading(false);
      setIsSuccess(false);

      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError(err.message);
      }
    });
}

function fetchSupportedCryptos(setSupportedCryptos, setError, config) {
  axios
    .get("http://localhost:8080/cryptos", config)
    .then((response) => {
      const responseData = response.data["cryptos"];
      const cryptos = [];

      for (const crypto of responseData) {
        cryptos.push(crypto["Name"]);
      }

      setSupportedCryptos(cryptos);
    })
    .catch((err) => {
      setError(err.message);
    });
}

export { addCryptoToAssets, fetchSupportedCryptos };
