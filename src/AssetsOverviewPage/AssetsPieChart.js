import React from "react";

import { PieChart } from "react-minimal-pie-chart";

function AssetsPieChart(props) {
  const getPieChartContent = () => {
    if (props.assets.length === 0) {
      return;
    }

    let content = [];

    for (let i = 0; i < props.assets.length; i++) {
      content.push({
        title: props.assets[i].Abbreviation,
        value: parseInt(props.assets[i].TotalPrice),
        color: props.assets[i].Color,
      });
    }

    return content;
  };

  const getTotalAssetBalance = () => {
    let total = 0;

    for (let i = 0; i < props.assets.length; i++) {
      total += parseFloat(props.assets[i].TotalPrice);
    }

    return total.toFixed(2);
  };

  return (
    <PieChart
      style={{ height: "200px", marginBottom: "30px" }}
      lineWidth={20}
      data={getPieChartContent()}
      label={() => {
        let total = getTotalAssetBalance();
        return "€" + total;
      }}
      labelPosition={0}
      labelStyle={{
        fontSize: "10px",
        fill: "rgb(50,61,73)",
      }}
    />
  );
}

export default AssetsPieChart;
