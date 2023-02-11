import React, { useState, useEffect } from "react";
import "./AddTransaction.css";
import Header from "../Header/Header";
import { Row, Col, FormControl, Button } from "react-bootstrap";
import axiosInstance from "../../helpers/axios";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

export default function AddTransaction({ isEdit }) {
  const [transactionData, setTransactionData] = useState({
    transactionId: "",
    senderName: "",
    receiverName: "",
    senderAccountNumber: undefined,
    receiverAccountNumber: undefined,
    amount: undefined,
    transactionDate: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (isEdit && id) {
        const { data } = await axiosInstance.get("transactions");
        if (data && data.result && data.result.length > 0) {
          const filterTransactionData = data.result.find(
            (transData) => transData.id === +id
          );
          console.log("dd", filterTransactionData);
          setTransactionData({
            transactionId: filterTransactionData.transactionId,
            senderName: filterTransactionData.senderName,
            receiverName: filterTransactionData.receiverName,
            senderAccountNumber: filterTransactionData.senderAccountNumber,
            receiverAccountNumber: filterTransactionData.receiverAccountNumber,
            amount: +filterTransactionData.amount,
            transactionDate: filterTransactionData.transactionDate,
          });
          console.log(">>", transactionData);
        }
      }
    })();
  }, [id]);

  return (
    <div className="addTransactionContainer">
      <Header isShow={false} />
      <div className="transaction">
        <Row>
          <Col xs={12} md={12} lg={6} sm={12}>
            <label>Enter Your Transaction Id</label>
            <FormControl
              value={transactionData.transactionId}
              className="input"
              type="text"
              placeholder="Transaction Id"
              onChange={(e) =>
                setTransactionData((state) => ({
                  ...state,
                  transactionId: e.target.value,
                }))
              }
            />
          </Col>
          <Col xs={12} md={12} lg={6} sm={12}>
            <label>Sender Name</label>
            <FormControl
              value={transactionData.senderName}
              className="input"
              type="text"
              placeholder="Sender Name"
              onChange={(e) =>
                setTransactionData((state) => ({
                  ...state,
                  senderName: e.target.value,
                }))
              }
            />
          </Col>
          <Col xs={12} md={12} lg={6} sm={12}>
            <label>Sender Account Number</label>
            <FormControl
              value={transactionData.senderAccountNumber}
              className="input"
              type="number"
              placeholder="Sender Account Number"
              onChange={(e) =>
                setTransactionData((state) => ({
                  ...state,
                  senderAccountNumber: e.target.value,
                }))
              }
            />
          </Col>
          <Col xs={12} md={12} lg={6} sm={12}>
            <label>Receiver Name</label>
            <FormControl
              value={transactionData.receiverName}
              className="input"
              type="text"
              placeholder="Receiver Name"
              onChange={(e) =>
                setTransactionData((state) => ({
                  ...state,
                  receiverName: e.target.value,
                }))
              }
            />
          </Col>
          <Col xs={12} md={12} lg={6} sm={12}>
            <label>Receiver Account Number</label>
            <FormControl
              value={transactionData.receiverAccountNumber}
              className="input"
              type="number"
              placeholder="Receiver Account Number"
              onChange={(e) =>
                setTransactionData((state) => ({
                  ...state,
                  receiverAccountNumber: e.target.value,
                }))
              }
            />
          </Col>
          <Col xs={12} md={12} lg={6} sm={12}>
            <label>Amount</label>
            <FormControl
              value={transactionData.amount}
              className="input"
              type="number"
              placeholder="Amount"
              onChange={(e) =>
                setTransactionData((state) => ({
                  ...state,
                  amount: e.target.value,
                }))
              }
            />
          </Col>
          <Col xs={12} md={12} lg={6} sm={12}>
            <label>Transaction Date</label>
            <FormControl
              value={transactionData.transactionDate}
              className="input"
              type="date"
              placeholder="Transaction Date"
              onChange={(e) =>
                setTransactionData((state) => ({
                  ...state,
                  transactionDate: moment(e.target.value).format("YYYY-MM-DD"),
                }))
              }
            />
          </Col>
          <Col xs={12} md={12} lg={6} sm={12}/>
          <Col xs={12} md={12} lg={6} sm={12}>
            <Button
              variant="success"
              className="button"
              type="button"
              onClick={async () => {
                if (
                  (transactionData && !transactionData.transactionId) ||
                  !transactionData.senderName ||
                  !transactionData.senderAccountNumber ||
                  !transactionData.receiverName ||
                  !transactionData.receiverAccountNumber ||
                  !transactionData.transactionDate
                ) {
                  alert("Please enter data in all fields");
                  return;
                }

                if (isEdit) {
                    const { data } = await axiosInstance.put('transactions/' + +id,{
                        transactionId: transactionData.transactionId,
                        senderName: transactionData.senderName,
                        senderAccountNumber: +transactionData.senderAccountNumber,
                        receiverName: transactionData.receiverName,
                        receiverAccountNumber: +transactionData.receiverAccountNumber,
                        amount: +transactionData.amount,
                        transactionDate: moment(transactionData.transactionDate).format("YYYY-MM-DD") 
                    });
                    if (data && data.status === 200) navigate("/allTransaction", { replace: true });
                } else {
                  const { data } = await axiosInstance.post("/transactions", {
                    transactionId: transactionData.transactionId,
                    senderName: transactionData.senderName,
                    senderAccountNumber: +transactionData.senderAccountNumber,
                    receiverName: transactionData.receiverName,
                    receiverAccountNumber:
                      +transactionData.receiverAccountNumber,
                    amount: +transactionData.amount,
                    transactionDate: transactionData.transactionDate,
                  });
                  if (data && data.status === 200)
                    navigate("/allTransaction", { replace: true });
                }
              }}
            >
              {isEdit ? "Edit" : "Add"}
            </Button>
          </Col>
          <Col xs={12} md={12} lg={6} sm={12}>
            <Button
              className="button"
              variant="danger"
              type="button"
              onClick={() =>
                setTransactionData({
                  transactionId: "",
                  senderName: "",
                  receiverName: "",
                  senderAccountNumber: undefined,
                  receiverAccountNumber: undefined,
                  transactionDate: "",
                  amount: undefined
                })
              }
            >
              clear
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}
