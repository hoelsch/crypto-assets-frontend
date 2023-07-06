import axios from "axios";

import { BACKEND_URL } from "../config";

function addCryptoToAssets(
  crypto,
  amount,
  userId,
  fetchAssets,
  setIsLoading,
  setIsSuccess,
  setError
) {
  axios
    .post(`${BACKEND_URL}/users/${userId}/assets/` + crypto, { amount: amount }, { withCredentials: true })
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

function fetchSupportedCryptos(setSupportedCryptos, setError) {
  axios
    .get(`${BACKEND_URL}/cryptos`, { withCredentials: true })
    .then((response) => {
      const responseData = response.data["cryptos"];
      const cryptos = [];

      for (const crypto of responseData) {
        cryptos.push(crypto["name"]);
      }

      setSupportedCryptos(cryptos);
    })
    .catch((err) => {
      setError(err.message);
    });
}

export { addCryptoToAssets, fetchSupportedCryptos };
