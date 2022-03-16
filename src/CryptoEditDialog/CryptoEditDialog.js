import * as React from "react";

import axios from "axios";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import ProgressIcon from "../ProgressIcon/ProgressIcon";
import SuccessDialog from "../SuccessDialog/SuccessDialog";
import ErrorText from "../ErrorText/ErrorText";
import CryptoEditForm from "./CryptoEditForm";

import getAuthHeaderConfig from "../Authorization/Authorization";

export default function CryptoEditDialog(props) {
  const [assetsToUpdate, setAssetsToUpdate] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError] = React.useState();
  const [allAssetsDeleted, setAllAssetsDeleted] = React.useState(false);

  React.useEffect(() => {
    setAssetsToUpdate(props.assets);
  }, [props.assets]);

  const config = getAuthHeaderConfig(props.token);

  const handleClose = () => {
    props.setOpenEditDialog(false);
    setIsSuccess(false);
    setIsLoading(false);
    setError();
    setAllAssetsDeleted(false);
  };

  const handleAssetDelete = (cryptoName) => {
    const newAssets = [...assetsToUpdate];
    for (let i = 0; i < newAssets.length; i++) {
      if (newAssets[i].CryptoName === cryptoName) {
        newAssets[i]["Deleted"] = true;
      }
    }

    let numDeletedAssets = 0;
    for (let i = 0; i < newAssets.length; i++) {
      if (newAssets[i]["Deleted"]) {
        numDeletedAssets++;
      }
    }

    if (numDeletedAssets === newAssets.length) {
      setAllAssetsDeleted(true);
    }

    setAssetsToUpdate(newAssets);
  };

  const handleAmountChange = (cryptoName, amount) => {
    if (amount <= 0) {
      amount = 0;
      setError("Amount must be greater than zero");
    } else {
      setError();
    }

    const newAssets = [...assetsToUpdate];
    for (let i = 0; i < newAssets.length; i++) {
      if (newAssets[i].CryptoName === cryptoName) {
        newAssets[i].Amount = amount;
        newAssets[i]["Updated"] = true;
        break;
      }
    }

    setAssetsToUpdate(newAssets);
  };

  const handleUpdateAssets = () => {
    setIsLoading(true);
    setError();

    const requests = [];

    for (let i = 0; i < assetsToUpdate.length; i++) {
      const cryptoName = assetsToUpdate[i]["CryptoName"];

      if ("Updated" in assetsToUpdate[i]) {
        const amount = assetsToUpdate[i]["Amount"];
        requests.push(
          axios.put(
            "http://localhost:8080/assets/" + cryptoName,
            { amount: amount },
            config
          )
        );
      } else if ("Deleted" in assetsToUpdate[i]) {
        requests.push(
          axios.delete("http://localhost:8080/assets/" + cryptoName, config)
        );
      }
    }

    axios
      .all(requests)
      .then(() => {
        setIsLoading(false);
        setIsSuccess(true);
        props.fetchAssets();
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
  };

  if (isSuccess) {
    return (
      <SuccessDialog
        message={"Successfully updated Assets"}
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
        <DialogTitle>Edit your Assets</DialogTitle>
        <DialogContent>
          <CryptoEditForm
            assetsToUpdate={assetsToUpdate}
            handleAssetDelete={handleAssetDelete}
            handleAmountChange={handleAmountChange}
          />
          {allAssetsDeleted &&
            "All cryptos in your assets were marked for deletion. Click 'Apply' to confirm the deletion, or 'Cancel' for aborting it"}
          {error && <ErrorText error={error} />}
          {isLoading && <ProgressIcon />}
        </DialogContent>
        <DialogActions>
          <>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleUpdateAssets}>Apply</Button>
          </>
        </DialogActions>
      </Dialog>
    </>
  );
}
