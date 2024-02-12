import './App.css';
import Header from './Header';
import AddTransaction from './AddTransaction';
import TransactionList from './TransactionList';

function App() {
  return (
    <div className="ui container">
      <Header/>
      <AddTransaction/>
      <TransactionList/>

    </div>
  );
}

export default App;
