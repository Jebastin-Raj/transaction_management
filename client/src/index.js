import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";


//Compoents
import App from "./Compoents/App/App";
import AllTransactions from "./Compoents/AllTransactions/AllTransactions";
import AddTransaction from "./Compoents/AddTransaction/AddTransaction";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/allTransaction" element={<AllTransactions />} />
        <Route path="/addTransaction" element={<AddTransaction />} />
        <Route path="/editTransaction" element={<AllTransactions isEdit={true} />} />
        <Route path="/editTransaction/:id" element={<AddTransaction isEdit={true} />} />
      </Routes>
    </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
