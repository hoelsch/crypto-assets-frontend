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

  const config = getAuthHeaderConfig(props.token);

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
      (a) => a.CryptoName === cryptoToDelete
    );

    setAssetsToDelete((oldAssetsToDelete) => [
      ...oldAssetsToDelete,
      assetMarkedForDeletion,
    ]);
    setAssetsToDisplay((oldAssetsToDisplay) =>
      oldAssetsToDisplay.filter((a) => a.CryptoName !== cryptoToDelete)
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
      (a) => a.CryptoName === cryptoToUpdate
    );

    const newAssetsToDisplay = updateAssets(assetsToDisplay, assetMarkedForUpdate, newAmount)
    const newAssetsToUpdate = updateAssets(assetsToUpdate, assetMarkedForUpdate, newAmount, true)

    setAssetsToDisplay(newAssetsToDisplay);
    setAssetsToUpdate(newAssetsToUpdate);
  };

  const handleUpdateAssets = () => {
    setIsLoading(true);
    setError();

    const requests = [];

    for (const asset of assetsToUpdate) {
      requests.push(
        axios.put(
          "http://localhost:8080/assets/" + asset.CryptoName,
          { amount: asset.Amount },
          config
        )
      );
    }

    for (const asset of assetsToDelete) {
      requests.push(
        axios.delete("http://localhost:8080/assets/" + asset.CryptoName, config)
      );
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
            assetsToUpdate={assetsToDisplay}
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

function updateAssets(assets, assetToUpdate, newAmount, addCryptoIfNotFoundInAssets = false) {
  const newAssets = [...assets];

  const assetMarkedForUpdate = newAssets.find(
    (a) => a.CryptoName === assetToUpdate.CryptoName
  );

  if (assetMarkedForUpdate) {
    assetMarkedForUpdate["Amount"] = newAmount;

    return newAssets
  }

  if (addCryptoIfNotFoundInAssets) {
    const assetMarkedForUpdate = assetToUpdate;
    assetMarkedForUpdate["Amount"] = newAmount
    newAssets.push(assetMarkedForUpdate);
  }

  return newAssets
}

export default CryptoEditDialog;
