import React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import AddButton from "./AddButton";
import AssetsPieChart from "./AssetsPieChart";
import CryptoList from "./../CryptoList/CryptoList";
import CryptoAddDialog from "./../CryptoAddDialog/CryptoAddDialog";
import CryptoEditDialog from "./../CryptoEditDialog/CryptoEditDialog";
import EditButton from "./EditButton";
import EmptyAssetsInfo from "./EmptyAssetsInfo";
import ErrorText from "../ErrorText/ErrorText";
import fetchAssets from "./FetchAssets";
import getAuthHeaderConfig from "../Authorization/Authorization";
import LogoutButton from "./LogoutButton";

function AssetsOverviewPage(props) {
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [assets, setAssets] = React.useState([]);
  const [error, setError] = React.useState();
  const [showEmtpyAssetsInfo, setShowEmtpyAssetsInfo] = React.useState(false);

  const config = getAuthHeaderConfig(props.token);

  const fetchAssetsFromServer = () =>
    fetchAssets(
      "http://localhost:8080/assets", // TODO: make url configurable
      config,
      assets,
      setAssets,
      setShowEmtpyAssetsInfo,
      setError
    );

  React.useEffect(() => {
    if (assets.length > 0) {
      return;
    }

    fetchAssetsFromServer();
  });

  return (
    <>
      <LogoutButton handleClickLogout={props.handleClickLogout} />
      <Box p={4}>
        <Grid container>
          <Grid
            item
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
            p={1}
          >
            <Grid item>
              <AddButton openAddDialog={setOpenAddDialog} />
            </Grid>
            {!showEmtpyAssetsInfo && assets.length > 0 && (
              <Grid item>
                <EditButton openEditDialog={setOpenEditDialog} />
              </Grid>
            )}
          </Grid>
          <Grid
            item
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <AssetsPieChart assets={assets} />
            <CryptoList assets={assets} />
            {showEmtpyAssetsInfo && <EmptyAssetsInfo />}
            {error && <ErrorText error={error} />}
          </Grid>
        </Grid>
      </Box>
      <CryptoAddDialog
        open={openAddDialog}
        setOpenAddDialog={setOpenAddDialog}
        fetchAssets={fetchAssetsFromServer}
        token={props.token}
      />
      <CryptoEditDialog
        open={openEditDialog}
        setOpenEditDialog={setOpenEditDialog}
        fetchAssets={fetchAssetsFromServer}
        assets={Array.from(assets)}
        token={props.token}
      />
    </>
  );
}

export default AssetsOverviewPage;
