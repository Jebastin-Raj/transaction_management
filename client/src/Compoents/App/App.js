import "./App.css";
import { useEffect, useState } from "react";
import moment from "moment";
import "chart.js/auto";
import { Row, Col } from "react-bootstrap";

import LineChart from "../Chart/LineChart/LineChart";
import PieChart from "../Chart/PieChart/PieChart";
import Header from "../Header/Header";
import axiosInstance from "../../helpers/axios";
import { jwt_secret_key } from '../../config';

let monthObj = {
  Jan: 0,
  Feb: 0,
  Mar: 0,
  Apr: 0,
  May: 0,
  Jun: 0,
  Jul: 0,
  Aug: 0,
  Sep: 0,
  Oct: 0,
  Nov: 0,
  Dec: 0,
};

function App() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axiosInstance.get("/transactions");
      if (data && data.status === 200) {
        setChartData(data.result);
        data.result.map((transData) => {
          let month = transData && moment(transData.transactionDate).format("MMM");
          let year = transData && +(moment(transData.transactionDate).format("YYYY"));
          console.log(+(moment().format("YYYY")),year)
          if (monthObj.hasOwnProperty(month) && +(moment().format("YYYY")) === year)
            monthObj[month] += transData.amount;
        });
      }
    })();
  }, []);

  return (
    <div className="App">
      <Header isShow={true} />
      <div className="ChartContainer">
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <LineChart
              chartData={{
                labels: [
                  "JAN",
                  "FEB",
                  "MAR",
                  "APR",
                  "MAY",
                  "JUN",
                  "JUL",
                  "AUG",
                  "SEP",
                  "OCT",
                  "NOV",
                  "DEC",
                ],
                datasets: [
                  {
                    label: "Transactions",
                    data: Object.values(monthObj),
                    backgroundColor: [
                      "rgba(75,192,192,1)",
                      "#ecf0f1",
                      "#50AF95",
                      "#f3ba2f",
                      "#2a71d0",
                    ],
                    borderColor: "black",
                    borderWidth: 2,
                  },
                ],
              }}
            />
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <PieChart
              chartData={{
                labels: [
                  "JAN",
                  "FEB",
                  "MAR",
                  "APR",
                  "MAY",
                  "JUN",
                  "JUL",
                  "AUG",
                  "SEP",
                  "OCT",
                  "NOV",
                  "DEC",
                ],
                datasets: [
                  {
                    label: "Transactions",
                    data: Object.values(monthObj),
                    backgroundColor: [
                      "rgba(75,192,192,1)",
                      "#ecf0f1",
                      "#50AF95",
                      "#f3ba2f",
                      "#2a71d0",
                    ],
                    borderColor: "black",
                    borderWidth: 2,
                  },
                ],
              }}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default App;
