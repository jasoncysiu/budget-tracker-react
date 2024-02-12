import React from "react";

class AddTransaction extends React.Component {
  state = {
    item: "",
    cost: "",
  };

  add = (e) => {
    e.preventDefault();
    if (this.state.item === "" || this.state.cost === "") {
      alert("All the fields are mandatory!");
      return;
    }
    this.props.addTransactionHandler(this.state);
    this.setState({ item: "", cost: "" });
  };

  

  render() {
    return (
      <div className="ui main">
        <h2>Add Transaction</h2>
        <form className="ui form" onSubmit={this.add}>
          <div className="field">
            <label>Item</label>
            <input
              type="text"
              name="Item"
              placeholder="Item"
              value={this.state.item}
              onChange={(e) => this.setState({ item: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Cost</label>
            <input
              type="text"
              name="Cost"
              placeholder="Cost"
              value={this.state.cost}
              onChange={(e) => this.setState({ cost: e.target.value })}
            />
          </div>
          <button className="ui button blue" type="submit">Add</button>
        </form>
      </div>
    );
  }
}

export default AddTransaction;
