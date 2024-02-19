import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/transactions'; // Assuming this is how you access your backend

const EditTransaction = ({ updateTransactionHandler, transactions }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState({ id: '', item: '', cost: '' });

  // Fetch transaction details from the backend if not passed through props
  const fetchTransactionDetails = async (transactionId) => {
    const response = await api.get(`/transactions/${transactionId}`);
    return response.data;
  };

  useEffect(() => {
    const gettransaction = async () => {
      if (transactions) {
        // If transactions are available as props, find the transaction directly
        const transactionToEdit = transactions.find(transaction => transaction.id === id);
        if (transactionToEdit) {
          setTransaction(transactionToEdit);
        } else {
          navigate('/'); // Redirect if the transaction isn't found
        }
      } else {
        // If transactions are not available, fetch from the backend
        const fetchedtransaction = await fetchTransactionDetails(id);
        if (fetchedtransaction) {
          setTransaction(fetchedtransaction);
        } else {
          navigate('/'); // Redirect if the transaction isn't found
        }
      }
    };

    gettransaction();
  }, [id, navigate, transactions]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (transaction.item && transaction.cost) {
      updateTransactionHandler(transaction);
      navigate('/');
    }
  };

  return (
    <div className="ui main">
      <h2>Edit transaction</h2>
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Item</label>
          <input
            type="text"
            name="item"
            placeholder="item"
            value={transaction.item}
            onChange={handleInputChange}
          />
        </div>
        <div className="field">
          <label>Cost</label>
          <input
            type="number"
            name="cost"
            placeholder="Cost"
            value={transaction.cost}
            onChange={handleInputChange}
          />
        </div>
        <button className="ui button blue">Update transaction</button>
      </form>
    </div>
  );
};

export default EditTransaction;
