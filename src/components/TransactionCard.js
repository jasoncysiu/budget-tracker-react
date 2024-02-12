import React from "react";
import item_img from "../image/item.png"
const TransactionCard = (props) => {
  const { id, item, cost } = props.transaction;
  return (
    <div className="item">
        <img className="ui avatar image" src = {item_img} alt="item"/>
      <div className="content">
        <div className="header">{item}</div>
        <div>{cost}</div>
      </div>
      <i className="trash alternate outline icon"
       style={{ color: 'red', marginTop: '7px' }}
       onClick={() => props.clickHandler(id)}></i>
    </div>
  );
};

export default TransactionCard;
