import React from "react";
import { Link, useParams } from "react-router-dom";
import record from "../image/record.png";

const TransactionDetail = ({ transactions }) => {
  const { id } = useParams(); 
  const transaction = transactions.find((transaction) => transaction.id === id); // Find the transaction in the transactions array

  if (!transaction) {
    return <div>Transaction not found</div>;
  }

  const { item, cost } = transaction;

  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={record} alt="record" />
        </div>
        <div className="content">
          <div className="header">{item}</div>
          <div className="description">{cost}</div>
        </div>
      </div>
      <div className="center-div">
        <Link to="/">
          <button className="ui button blue center">
            Back to Transaction List
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TransactionDetail;
