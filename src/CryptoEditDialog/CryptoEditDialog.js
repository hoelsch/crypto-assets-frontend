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

import { BACKEND_URL } from "../config";

function CryptoEditDialog(props) {
  const [assetsToDisplay, setAssetsToDisplay] = React.useState([]);
  const [assetsToUpdate, setAssetsToUpdate] = React.useState([]);
  const [assetsToDelete, setAssetsToDelete] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError] = React.useState();

  React.useEffect(() => {
    setAssetsToDisplay(props.assets);
  }, [props.assets]);

  const handleClose = () => {
    props.setOpenEditDialog(false);
    setIsSuccess(false);
    setIsLoading(false);
    setError();
    setAssetsToDelete([]);
    setAssetsToUpdate([]);
  };

  const handleAssetDelete = (cryptoToDelete) => {
    const assetMarkedForDeletion = props.assets.find(
      (a) => a.crypto_name === cryptoToDelete
    );

    setAssetsToDelete((oldAssetsToDelete) => [
      ...oldAssetsToDelete,
      assetMarkedForDeletion,
    ]);
    setAssetsToDisplay((oldAssetsToDisplay) =>
      oldAssetsToDisplay.filter((a) => a.crypto_name !== cryptoToDelete)
    );
  };

  const handleAmountChange = (cryptoToUpdate, newAmount) => {
    if (newAmount <= 0) {
      newAmount = 0;
      setError("Amount must be greater than zero");
    } else {
      setError();
    }

    const assetMarkedForUpdate = props.assets.find(
      (a) => a.crypto_name === cryptoToUpdate
    );

    const newAssetsToDisplay = updateAssets(
      assetsToDisplay,
      assetMarkedForUpdate,
      newAmount
    );
    const newAssetsToUpdate = updateAssets(
      assetsToUpdate,
      assetMarkedForUpdate,
      newAmount,
      true
    );

    setAssetsToDisplay(newAssetsToDisplay);
    setAssetsToUpdate(newAssetsToUpdate);
  };

  const handleUpdateAssets = () => {
    for (const asset of assetsToUpdate) {
      if (asset.amount == 0) {
        return;
      }
    }

    setIsLoading(true);
    setError();

    const requests = constructRequests(assetsToUpdate, assetsToDelete, props.userId);

    axios
      .all(requests, { withCredentials: true })
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
            assetsToDisplay={assetsToDisplay}
            handleAssetDelete={handleAssetDelete}
            handleAmountChange={handleAmountChange}
          />
          {assetsToDisplay.length === 0 &&
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

function updateAssets(
  assets,
  assetToUpdate,
  newAmount,
  addCryptoIfNotFoundInAssets = false
) {
  const newAssets = [...assets];

  const assetMarkedForUpdate = newAssets.find(
    (a) => a.crypto_name === assetToUpdate.crypto_name
  );

  if (assetMarkedForUpdate) {
    assetMarkedForUpdate["amount"] = newAmount;

    return newAssets;
  }

  if (addCryptoIfNotFoundInAssets) {
    const assetMarkedForUpdate = assetToUpdate;
    assetMarkedForUpdate["amount"] = newAmount;
    newAssets.push(assetMarkedForUpdate);
  }

  return newAssets;
}

function constructRequests(assetsToUpdate, assetsToDelete, userId) {
  const requests = [];

  for (const asset of assetsToUpdate) {
    requests.push(
      axios.put(
        `${BACKEND_URL}/users/${userId}/assets/` + asset.crypto_name,
        { amount: asset.amount },
        { withCredentials: true },
      )
    );
  }

  for (const asset of assetsToDelete) {
    requests.push(
      axios.delete(`${BACKEND_URL}/users/${userId}/assets/` + asset.crypto_name, { withCredentials: true })
    );
  }

  return requests;
}

export default CryptoEditDialog;
