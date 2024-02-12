import React from "react";
import TransactionCard from './TransactionCard'

const TransactionList = (props) => {
    console.log(props);

    const renderTransactionList = props.transactions.map((transaction) => {
      return (
       <TransactionCard transaction = {transaction}/>
      );
    });
    return <div className="ui celled list">{renderTransactionList}</div>;
  };

export default TransactionList;