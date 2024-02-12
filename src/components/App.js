import './App.css';
import Header from './Header';
import AddTransaction from './AddTransaction';
import TransactionList from './TransactionList';
import { useState } from 'react';

function App() {

  const [transactions, setTransactions] = useState([]);

  const addTransactionHandler = (transaction) => {
    setTransactions([...transactions, transaction ]);
    console.log(transaction);

  };
  return (
    <div className="ui container">
      <Header/>
      <AddTransaction addTransactionHandler={addTransactionHandler} />
      <TransactionList transactions = {transactions}/>

    </div>
  );
}

export default App;
