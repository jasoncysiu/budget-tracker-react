import React from "react";
import { Link } from "react-router-dom";
import item_img from "../image/item.png";
const TransactionCard = (props) => {
  const { id, item, cost } = props.transaction;
  return (
    <div className="item">
      <img className="ui avatar image" src={item_img} alt="item" />
      <div className="content">
        <Link
          to={{
            pathname: `/transaction/${id}`,
            state: { contact: props.transaction },
          }}
        >
          <div className="header">{item}</div>
          <div>{cost}</div>
        </Link>{" "}
      </div>
      <i
        className="trash alternate outline icon"
        style={{ color: "red", marginTop: "7px" }}
        onClick={() => props.clickHandler(id)}
      ></i>

      <Link to={`/edit/${id}`}>
        <i
          className="edit alternate outline icon"
          style={{ color: "blue", marginTop: "7px" }}
        ></i>
      </Link>
    </div>
  );
};

export default TransactionCard;
