import React from "react";

import { PieChart } from "react-minimal-pie-chart";

function AssetsPieChart(props) {
  const style = { height: "200px", marginBottom: "30px" };
  const labelStyle = { fontSize: "10px", fill: "rgb(50,61,73)" };
  const data = getPieChartContent(props.assets);
  const totalBalanceEuro = "€" + getTotalAssetBalance(props.assets);

  return (
    <PieChart
      style={style}
      lineWidth={20}
      data={data}
      label={() => totalBalanceEuro}
      labelPosition={0}
      labelStyle={labelStyle}
    />
  );
}

function getPieChartContent(assets) {
  const content = [];

  for (let asset of assets) {
    content.push({
      title: asset.abbreviation,
      value: parseFloat(asset.TotalPrice),
      color: asset.Color,
    });
  }

  return content;
}

function getTotalAssetBalance(assets) {
  let total = 0;

  for (let asset of assets) {
    total += parseFloat(asset.TotalPrice);
  }

  return total.toFixed(2);
}

export default AssetsPieChart;
