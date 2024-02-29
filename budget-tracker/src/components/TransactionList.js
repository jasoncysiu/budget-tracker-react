import React, { useRef } from "react";
import { Link } from "react-router-dom";
import TransactionCard from "./TransactionCard";

const TransactionList = (props) => {
  const inputElement = useRef("");

  const deleteTransactionHandler = (id) => {
    if(window.confirm("Are you sure you want to delete this transaction?")) {
      props.getTransactionId(id);
    }
  };

  const renderTransactionList = props.transactions.map((transaction) => {
    return (
      <TransactionCard
        transaction={transaction}
        clickHandler={deleteTransactionHandler}
        key={transaction.id}
      ></TransactionCard>
    );
  });

  const getSearchTerm = () => {
    props.searchKeyword(inputElement.current.value);
  };
  return (
    <div className="main">
      <h2>
        Transaction List
        <Link to="/add">
          <button className="ui button blue right">Add Transaction</button>
        </Link>
      </h2>
      <div className="ui search">
        <div className="ui icon input">
          <input
            ref={inputElement}
            type="text"
            placeholder="Search Transaction"
            className="prompt"
            value={props.term}
            onChange={getSearchTerm}
          />
          <i className="search icon"></i>
        </div>
      </div>

      <div className="ui celled list">
        {renderTransactionList.length > 0
          ? renderTransactionList
          : "No Transactions available"}
      </div>
    </div>
  );
};

export default TransactionList;
