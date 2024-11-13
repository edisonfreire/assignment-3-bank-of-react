import { useState } from "react";
import { Link } from "react-router-dom";

function Credits({ credits, addCredit }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleAddCredit = () => {
    const creditAmount = parseFloat(amount);
    if (!isNaN(creditAmount) && description) {
      const newCredit = {
        description,
        amount: creditAmount,
        date: new Date().toISOString(),
      };
      addCredit(newCredit);
      setAmount('');
      setDescription('');
    }
  };

  return (
    <div>
      <h2>Credits</h2>
      <Link to="/">Return to Home</Link>
      <ul>
        {credits.map((credit) => (
          <li key={credit.id}>
            <p>Description: {credit.description}</p>
            <p>Amount: ${parseFloat(credit.amount).toFixed(2)}</p>
            <p>Date: {new Date(credit.date).toISOString().slice(0, 10)}</p>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter credit description"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter credit amount"
      />
      <button onClick={handleAddCredit}>Add Credit</button>
    </div>
  )
}

export default Credits