import React from "react";

const TransactionCard = (props) => {
  const { id, item, cost } = props.transaction;
  return (
    <div className="item">
      <div className="content">
        <div className="header">{item}</div>
        <div>{cost}</div>
      </div>
      <i className="trash alternate outline icon"></i>
    </div>
  );
};

export default TransactionCard;
