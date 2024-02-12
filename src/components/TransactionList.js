import React from "react";

const TransactionList = (props) => {
    console.log(props);

    const renderTransactionList = props.transactions.map((transaction) => {
      return (
        <div className="item">
        <div className="content">
          <div className="header">{transaction.item}</div>
          <div>{transaction.cost}</div>
        </div>
        <i className="trash alternate outline icon"></i>
      </div>
      );
    });
    return <div className="ui celled list">{renderTransactionList}</div>;
  };

export default TransactionList;