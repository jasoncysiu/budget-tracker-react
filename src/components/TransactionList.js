import React from "react";
import { Link } from "react-router-dom";
import TransactionCard from './TransactionCard'

const TransactionList = (props) => {
    console.log(props);
    const deleteTransactionHandler = (id) => {
        props.getTransactionId(id);
      };

    const renderTransactionList = props.transactions.map((transaction) => {
      return (
       <TransactionCard 
       transaction = {transaction}
       clickHandler = {deleteTransactionHandler}>
       </TransactionCard>
      );
    });
    return (
      <div className="main">
      <h2>
      Transaction List
        <Link to="/add">
          <button className="ui button blue right">Add Transaction</button>
        </Link>
      </h2>
      <div className="ui celled list">{renderTransactionList}</div>
    </div>


    )
  };

export default TransactionList;