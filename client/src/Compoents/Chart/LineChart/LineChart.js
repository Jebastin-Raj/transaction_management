import React from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import "./LineChart.css";

export default function LineChart({ chartData }) {
    let nextYear, currentYear;
    nextYear = +(moment().format("YYYY")) + 1;
    currentYear = +(moment().format("YYYY"));

  return (
    <div className="chart-container">
      <h2 className="chartHeader">Line Chart</h2>
      {chartData && (
        <Line
          data={chartData}
          height="460px"
          width="760px"
          options={{
            maintainAspectRatio: true,
            plugins: {
              title: {
                display: true,
                text: `Transaction between ${currentYear} to ${nextYear}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}
