import * as React from "react";

import axios from "axios";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import getAuthHeaderConfig from "../Authorization/Authorization";
import CryptoAddForm from "./CryptoAddForm";
import ProgressIcon from "../ProgressIcon/ProgressIcon";
import SuccessDialog from "../SuccessDialog/SuccessDialog";
import ErrorText from "../ErrorText/ErrorText";

function CryptoAddDialog(props) {
  const [supportedCryptos, setSupportedCryptos] = React.useState([]);
  const [cryptoType, setCryptoType] = React.useState("bitcoin"); // TODO: rename cryptoType to make consistent with backend naming
  const [amount, setAmount] = React.useState(0.1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError] = React.useState();

  const config = getAuthHeaderConfig(props.token);

  const handleClose = () => {
    props.setOpenAddDialog(false);
    setIsSuccess(false);
    setIsLoading(false);
    setError();
    setCryptoType("bitcoin");
    setAmount(0.1);
  };

  const handleAdd = () => {
    if (amount === 0) {
      return;
    }

    setIsLoading(true);
    setError();

    addCryptoToAssets(
      cryptoType,
      amount,
      config,
      props.fetchAssets,
      setIsLoading,
      setIsSuccess,
      setError
    );
  };

  const handleCryptoTypeChange = (event) => {
    setCryptoType(event.target.value.toLowerCase());
  };

  const handleAmountChange = (event) => {
    if (event.target.value < 0) {
      event.target.value = 0;
    }

    if (event.target.value === 0) {
      setError("Amount must be greater than zero");
    } else {
      setError();
    }

    setAmount(parseFloat(event.target.value));
  };

  if (supportedCryptos.length === 0) {
    fetchSupportedCryptos(setSupportedCryptos, setError, config);
  }

  return (
    <>
      <Dialog
        open={props.open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"xs"}
      >
        {!isSuccess && <DialogTitle>Add Crypto to your Assets</DialogTitle>}
        <DialogContent>
          {!isSuccess && (
            <CryptoAddForm
              supportedCryptos={supportedCryptos}
              cryptoType={cryptoType}
              handleCryptoTypeChange={handleCryptoTypeChange}
              amount={amount}
              handleAmountChange={handleAmountChange}
            />
          )}
          {error && <ErrorText error={error} />}
          {isLoading && <ProgressIcon />}
          {isSuccess && (
            <SuccessDialog
              message={"Successfully added " + cryptoType + " to Assets"}
            />
          )}
        </DialogContent>
        <DialogActions>
          {isSuccess && <Button onClick={handleClose}>Close</Button>}
          {!isSuccess && (
            <>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleAdd}>Add</Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}

function addCryptoToAssets(
  cryptoType,
  amount,
  config,
  fetchAssets,
  setIsLoading,
  setIsSuccess,
  setError
) {
  axios
    .post(
      "http://localhost:8080/assets/" + cryptoType,
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

      for (let i = 0; i < responseData.length; i++) {
        const crypto = responseData[i];
        cryptos.push(crypto["Name"]);
      }

      setSupportedCryptos(cryptos);
    })
    .catch((err) => {
      setError(err.message);
    });
}

export default CryptoAddDialog;
