import React from "react";
import { Link } from "react-router-dom";
import TransactionCard from './TransactionCard'

const TransactionList = (props) => {

  const deleteTransactionHandler = (id) => {
        props.getTransactionId(id);
      };
      console.log("asdad", props)

    const renderTransactionList = props.transactions.map((transaction) => {
      return (
       <TransactionCard 
       transaction = {transaction}
       clickHandler = {deleteTransactionHandler}
       key={transaction.id}
       >
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