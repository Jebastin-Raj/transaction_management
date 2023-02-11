import React, { useEffect, useState } from "react";
import axiosInstance from "../../helpers/axios";
import { Table, Tr, Td, Thead, Th } from "reactable";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import "./AllTransactions.css";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function AllTransactions({ isEdit }) {
  const [transactionData, setTransactionData] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data } = await axiosInstance.get("/transactions");
      setTransactionData(data.result);
    })();
  }, []);

  return (
    <div>
      <Header isTransaction={true} isShow={true} />
      <Table
        className="table"
        noDataText={"No Transaction Found"}
        sortable={true}
        defaultSort={{ column: "id", direction: "desc" }}
      >
        <Thead>
          <Th scope="col">Id</Th>
          <Th scope="col">Transaction Id</Th>
          <Th scope="col">Sender Name</Th>
          <Th scope="col">Sender Account Number</Th>
          <Th scope="col">Receiver Name</Th>
          <Th scope="col">Receiver Account Number</Th>
          <Th scope="col">Amount</Th>
          <Th scope="col">Transaction Date</Th>
          {isEdit && <Th scope="col">Edit</Th>}
          {isEdit && <Th scope="col">Delete</Th>}
        </Thead>
        {transactionData &&
          transactionData.length > 0 &&
          transactionData.map((transData, index) => {
            return (
              <Tr key={index}>
                <Td data-label={"Id"} column={"Id"} data={transData.id} />
                <Td
                  data-label={"Transaction Id"}
                  column={"Transaction Id"}
                  data={transData.transactionId}
                />
                <Td
                  data-label={"Sender Name"}
                  column={"Sender Name"}
                  data={transData.senderName}
                />
                <Td
                  data-label={"Sender Account Number"}
                  column={"Sender Account Number"}
                  data={transData.senderAccountNumber}
                />
                <Td
                  data-label={"Receiver Name"}
                  column={"Receiver Name"}
                  data={transData.receiverName}
                />
                <Td
                  data-label={"Receiver Account Number"}
                  column={"Receiver Account Number"}
                  data={transData.receiverAccountNumber}
                />
                <Td
                  data-label={"Amount"}
                  column={"Amount"}
                  data={transData.amount}
                />
                <Td
                  data-label={"Transaction Date"}
                  column={"Transaction Date"}
                  data={moment(transData.transactionDate).format("DD-MM-YYYY")}
                />
                {isEdit && (
                  <Td data-label={"Edit"} column={"Edit"}>
                    <Link to={"/editTransaction/" + transData.id}>Edit</Link>
                  </Td>
                )}
                {isEdit && (
                  <Td data-label={"Delete"} column={"Delete"}>
                    <Link
                      onClick={async () => {
                        const { data } = await axiosInstance.delete(
                          "transactions/" + transData.id
                        );
                        if (data && data.status === 200) {
                          const { data } = await axiosInstance.get(
                            "/transactions"
                          );
                          setTransactionData(data.result);
                          navigate("/allTransaction", { replace: true });
                        }
                      }}
                    >
                      Delete
                    </Link>
                  </Td>
                )}
              </Tr>
            );
          })}
      </Table>
    </div>
  );
}
