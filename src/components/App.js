import './App.css';
import Header from './Header';
import {v4 as uuid} from 'uuid'  
import AddTransaction from './AddTransaction';
import TransactionList from './TransactionList';
import { useState ,useEffect} from 'react';

function App() {
  const LOCAL_STORAGE_KEY = "transactions";

  const [transactions, setTransactions] = useState([]);

  const addTransactionHandler = (transaction) => {
    setTransactions([...transactions, {id:uuid(), ...transaction} ]);
    console.log(transaction);

  };

  const removeTransactionHandler = (id) => {
    const newTransactions = transactions.filter((transaction) => {
      return transaction.id !== id;
    });

    setTransactions(newTransactions);
  };

  useEffect(() => {
    const retriveTransactions = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveTransactions) setTransactions(retriveTransactions);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);
  return (
    <div className="ui container">
      <Header/>
      <AddTransaction addTransactionHandler={addTransactionHandler} />
      <TransactionList transactions = {transactions} getTransactionId = {removeTransactionHandler}/>

    </div>
  );
}

export default App;
