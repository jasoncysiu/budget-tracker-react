import "./App.css";
import { useState, useEffect } from "react";
import Header from "./Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { v4 as uuid } from "uuid";
import AddTransaction from "./AddTransaction";
import TransactionList from "./TransactionList";
import TransactionDetail from "./TransactionDetail";
import api from "../api/transactions";
import EditTransaction from "./EditTransaction";

function App() {
  const LOCAL_STORAGE_KEY = "transactions";

  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // retrieve Transactions
  const retrieveTransactions = async () => {
    const response = await api.get("/transactions");
    console.log("Retrieving: ", response);
    return response.data;
  };

  const addTransactionHandler = async (transaction) => {
    const request = {
      id: uuid(),
      ...transaction,
    };
    console.log("testing--", request);

    api
      .post("/transactions", { request })
      .then((response) => {
        console.log("data successfully sent to server"); // Handle success
      })
      .catch((error) => {
        console.error(error); // Handle error
      });

    setTransactions([...transactions, request]);
    console.log("testing 2", request);
  };

  // const updateTransactionHandler = async (transaction) => {
  //   const response = await api.put(
  //     `/transactions/${transaction.id}`,
  //     transaction
  //   );
  //   setTransactions(
  //     transactions.map((c) => {
  //       return c.id === transaction.id ? { ...response.data } : c;
  //     })
  //   );
  //   // Navigate back to transaction list or handle UI update accordingly
  // };

  const updateTransactionHandler = async (transaction) => {
    // API call to update the transaction
    await api.put(`/transactions/${transaction.id}`, transaction);
    // Fetch the updated list of transactions
    const updatedTransactions = await retrieveTransactions();
    // Update state with the updated list
    setTransactions(updatedTransactions);
  };
  

  // remove transaction
  const removeTransactionHandler = async (id) => {
    await api.delete(`/transactions/${id}`);
    const newTransactionList = transactions.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(newTransactionList);
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newTransactionList = transactions.filter((transaction) => {
        return Object.values(transaction)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newTransactionList);
    } else {
      setSearchResults(transactions);
    }
  };

  useEffect(() => {
    const getAllTransactions = async () => {
      const allTransactions = await retrieveTransactions();
      if (allTransactions) setTransactions(allTransactions);
    };
    getAllTransactions();
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
            element={
              <AddTransaction addTransactionHandler={addTransactionHandler} />
            }
          />
          <Route
            path="/"
            element={
              <TransactionList
                transactions={
                  searchTerm.length < 1 ? transactions : searchResults
                }
                getTransactionId={removeTransactionHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
              />
            }
          />

          <Route
            path="/edit/:id"
            element={
              <EditTransaction
                updateTransactionHandler={updateTransactionHandler}
                transactions={transactions}
              />
            }
          />

          <Route
            path="/transaction/:id"
            element={<TransactionDetail transactions={transactions} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
