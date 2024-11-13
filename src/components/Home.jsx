import { Link } from "react-router-dom"
import AccountBalance from "./AccountBalance"


function Home({ accountBalance }) {
  return (
    <div>
      <img src="https://picsum.photos/200/200" alt="bank" />
      <h1>Bank of React</h1>

      <Link to="/userProfile">User Profile</Link>
      <br />
      <Link to="/login">Login</Link>
      <br />
      <Link to="/credits">Credits</Link>
      <br />
      <Link to="/debits">Debits (to be implemented in the Assignment)</Link>
      <br /><br />
      
      <AccountBalance accountBalance={accountBalance} />
    </div>
  )
}

export default Home