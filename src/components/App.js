import "./App.css";
import { useState, useEffect } from "react";
import Header from "./Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { v4 as uuid } from "uuid";
import AddTransaction from "./AddTransaction";
import TransactionList from "./TransactionList";
import TransactionDetail from "./TransactionDetail";

function App() {
  const LOCAL_STORAGE_KEY = "transactions";

  const [transactions, setTransactions] = useState([]);

  const addTransactionHandler = (transaction) => {
    setTransactions([...transactions, { id: uuid(), ...transaction }]);
    console.log(transaction);
  };

  const removeTransactionHandler = (id) => {
    const newTransactions = transactions.filter((transaction) => {
      return transaction.id !== id;
    });

    setTransactions(newTransactions);
  };

  useEffect(() => {
    const retriveTransactions = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)
    );
    if (retriveTransactions) setTransactions(retriveTransactions);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);
  return (
    <div className="ui container">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/add"
            element={<AddTransaction addTransactionHandler={addTransactionHandler} />}
          />
          <Route
            path="/"
            element={
              <TransactionList transactions={transactions} getTransactionId={removeTransactionHandler}/>
            }
          />
          <Route path="/transaction/:id" element={<TransactionDetail transactions={transactions}  />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
