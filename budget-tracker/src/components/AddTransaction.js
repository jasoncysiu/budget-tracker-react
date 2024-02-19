import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddTransaction(props) {
  const [item, setItem] = useState('');
  const [cost, setCost] = useState('');
  const navigate = useNavigate();

  const add = (e) => {
    e.preventDefault();
    if (item === "" || cost === "") {
      alert("All the fields are mandatory!");
      return;
    }
    props.addTransactionHandler({ item, cost });
    setItem("");
    setCost("");
    navigate("/");
  };

  const handleCostChange = (e) => {
    const input = e.target.value;
    // Check if input is a valid number
    if (!isNaN(input)) {
      setCost(input); // Update state only if input is a valid number
    }
  };

  return (
    <div className="ui main">
      <h2>Add Transaction</h2>
      <form className="ui form" onSubmit={add}>
        <div className="field">
          <label>Item</label>
          <input
            type="text"
            name="Item"
            placeholder="Item"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Cost</label>
          <input
            type="text"
            name="Cost"
            placeholder="Enter a number"
            value={cost}
            onChange={handleCostChange}
          />
        </div>
        <button className="ui button blue" type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddTransaction;
