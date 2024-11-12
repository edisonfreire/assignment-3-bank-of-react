import { Link } from 'react-router-dom';

function Debits({ debits }) {
  return (
    <div>
      <h1>Debits</h1>

      <ul>
        {debits.map((debit) => {
          const date = debit.date.slice(0, 10); // Format date
          return (
            <li key={debit.id}>
              {debit.amount} {debit.description} {date}
            </li>
          );
        })}
      </ul>

      {/* <form onSubmit={addDebit}>
        <input type="text" name="description" placeholder="Description" />
        <input type="number" name="amount" placeholder="Amount" />
        <button type="submit">Add Debit</button>
      </form> */}
      <br />
      <Link to="/">Return to Home</Link>
    </div>
  )
}

export default Debits