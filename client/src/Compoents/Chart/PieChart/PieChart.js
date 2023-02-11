import React from "react";
import "./PieChart.css";
import { Pie } from "react-chartjs-2";
import moment from "moment";

export default function PieChart({ chartData }) {
  let nextYear, currentYear;
    nextYear = +(moment().format("YYYY")) + 1;
    currentYear = +(moment().format("YYYY"));

  return (
    <div className="pieChartContainer">
      <h2 className="chartHeader">Pie Chart</h2>
      {chartData && (
        <Pie
          data={chartData}
          height="200px"
          width="800px"
          options={{
            plugins: {
              title: {
                display: true,
                text: `Transaction between ${currentYear} to ${nextYear}`
              },
            },
          }}
        />
      )}
    </div>
  );
}
