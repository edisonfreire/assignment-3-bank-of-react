import { useState } from 'react';
import { Link } from 'react-router-dom';

function Debits({ debits, addDebit }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleAddDebit = () => {
    const debitAmount = parseFloat(amount);
    if (!isNaN(debitAmount) && description) {
      const newDebit = {
        description,
        amount: debitAmount,
        date: new Date().toISOString()
      };
      addDebit(newDebit); // Pass the full object
      setAmount('');
      setDescription('');
    }
  };

  return (
    <div>
      <h2>Debits</h2>
      <Link to="/">Return to Home</Link>
      <ul>
        {debits.map((debit) => (
          <li key={debit.id}>
            <p>Description: {debit.description}</p>
            <p>Amount: ${parseFloat(debit.amount).toFixed(2)}</p>
            <p>Date: {new Date(debit.date).toISOString().slice(0,10)}</p>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter debit description"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter debit amount"
      />
      <button onClick={handleAddDebit}>Add Debit</button>
    </div>
  );
}

export default Debits