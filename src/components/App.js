import './App.css';
import Header from './Header';
import AddTransaction from './AddTransaction';
import TransactionList from './TransactionList';

function App() {

  const transactions =[
    {id:1, item : "Hamburger", cost:19},
    {id:2, item : "Medicine", cost:28},
]

  return (
    <div className="ui container">
      <Header/>
      <AddTransaction/>
      <TransactionList transactions = {transactions}/>

    </div>
  );
}

export default App;
