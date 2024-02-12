import React from "react";

class AddTransaction extends React.Component {

  render() {
    return (
      <div className="ui main">
        <h2>Add Transaction</h2>
        <form className="ui form">
          <div className="field">
            <label>Item</label>
            <input
              type="text"
              name="Item"
              placeholder="Item"
            />
          </div>
          <div className="field">
            <label>Cost</label>
            <input
              type="text"
              name="Cost"
              placeholder="Cost"
            />
          </div>
          <button className="ui button blue">Add</button>
        </form>
      </div>
    );
  }
}

export default AddTransaction;