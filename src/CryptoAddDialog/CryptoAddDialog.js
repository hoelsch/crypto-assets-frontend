import * as React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import CryptoAddForm from "./CryptoAddForm";
import ProgressIcon from "../ProgressIcon/ProgressIcon";
import { addCryptoToAssets, fetchSupportedCryptos } from "./Request";
import SuccessDialog from "../SuccessDialog/SuccessDialog";
import ErrorText from "../ErrorText/ErrorText";

function CryptoAddDialog(props) {
  const [supportedCryptos, setSupportedCryptos] = React.useState([]);
  const [selectedCrypto, setSelectedCrypto] = React.useState("bitcoin");
  const [amount, setAmount] = React.useState(0.1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError] = React.useState();

  const handleClose = () => {
    props.setOpenAddDialog(false);
    setIsSuccess(false);
    setIsLoading(false);
    setError();
    setSelectedCrypto("bitcoin");
    setAmount(0.1);
  };

  const handleAdd = () => {
    if (amount === 0) {
      return;
    }

    setIsLoading(true);
    setError();

    addCryptoToAssets(
      selectedCrypto,
      amount,
      props.userId,
      props.fetchAssets,
      setIsLoading,
      setIsSuccess,
      setError
    );
  };

  const handleCryptoChange = (event) => {
    setSelectedCrypto(event.target.value.toLowerCase());
  };

  const handleAmountChange = (event) => {
    let currentAmount = event.target.value;

    if (currentAmount < 0) {
      currentAmount = 0;
    }

    if (currentAmount === 0) {
      setError("Amount must be greater than zero");
    } else {
      setError();
    }

    setAmount(parseFloat(currentAmount));
  };

  React.useEffect(() => {
    fetchSupportedCryptos(setSupportedCryptos, setError);
  }, []);

  if (isSuccess) {
    return (
      <SuccessDialog
        message={"Successfully added " + selectedCrypto + " to Assets"}
        open={props.open}
        handleClose={handleClose}
      />
    );
  }

  return (
    <>
      <Dialog
        open={props.open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"xs"}
      >
        <DialogTitle>Add Crypto to your Assets</DialogTitle>
        <DialogContent>
          <CryptoAddForm
            supportedCryptos={supportedCryptos}
            selectedCrypto={selectedCrypto}
            amount={amount}
            handleCryptoChange={handleCryptoChange}
            handleAmountChange={handleAmountChange}
          />
          {error && <ErrorText error={error} />}
          {isLoading && <ProgressIcon />}
        </DialogContent>
        <DialogActions>
          <>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAdd}>Add</Button>
          </>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CryptoAddDialog;
