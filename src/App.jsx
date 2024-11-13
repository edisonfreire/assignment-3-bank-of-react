import { useEffect, useState } from 'react'
import './App.css'
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogIn from './components/LogIn';
import Credits from './components/Credits';
import Debits from './components/Debits';
import UserProfile from './components/UserProfile';

function App() {
  const [accountBalance, setAccountBalance] = useState(1234567.89);
  const [creditList, setCreditList] = useState([]);
  const [debitList, setDebitList] = useState([]);
  const [currentUser, setCurrentUser]= useState({
    userName: 'Joe Smith',
    memberSince: '11/22/99',
  });

  const mockLogIn = (logInInfo) => {
    setCurrentUser((prevUser) => ({ ...prevUser, userName: logInInfo.userName }));
  };

  // Credits Represent Income or Deposits
  const addCredit = (credit) => {
    const creditAmount = Number(credit.amount); // Ensure the amount is a number
    if (!isNaN(creditAmount)) {
      const newCredit = { 
        ...credit, 
        amount: creditAmount, 
        date: credit.date || new Date().toISOString() 
      };
      setCreditList([...creditList, newCredit]);
      setAccountBalance((prevBalance) => prevBalance + creditAmount);
    } else {
      console.error("Invalid amount entered:", credit);
    }
  };

  // Debits Represent Expenses or Withdrawals
  const addDebit = (debit) => {
    const debitAmount = Number(debit.amount); // Ensure the amount is a number
    if (!isNaN(debitAmount)) {
      const newDebit = { 
        ...debit, 
        amount: debitAmount, 
        date: debit.date || new Date().toISOString() 
      };
      setDebitList([...debitList, newDebit]);
      setAccountBalance((prevBalance) => prevBalance - debitAmount);
    } else {
      console.error("Invalid amount entered:", debit);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const creditsResponse = await fetch('https://johnnylaicode.github.io/api/credits.json');
        const creditsData = await creditsResponse.json();
        setCreditList(creditsData);

        const debitsResponse = await fetch('https://johnnylaicode.github.io/api/debits.json');
        const debitsData = await debitsResponse.json();
        setDebitList(debitsData);

        // Calculate initial account balance
        const creditsTotal = creditsData.reduce((sum, item) => sum + item.amount, 0);
        const debitsTotal = debitsData.reduce((sum, item) => sum + item.amount, 0);
        setAccountBalance(creditsTotal - debitsTotal);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);


  return (
    <Router basename="/bank-of-react-starter-code">
      <Routes>
        <Route 
          path="/" 
          element={<Home accountBalance={accountBalance.toFixed(2)} />} 
        />
        <Route
          path="/userProfile"
          element={
            <UserProfile 
              userName={currentUser.userName} 
              memberSince={currentUser.memberSince} 
            />
          }
        />
        <Route
          path="/login"
          element={
            <LogIn 
              user={currentUser} 
              mockLogIn={mockLogIn} 
            />
          }
        />
        <Route
          path="/credits"
          element={
            <Credits 
              credits={creditList} 
              addCredit={addCredit}
            />
          }
        />
        <Route
          path="/debits"
          element={
            <Debits 
              debits={debitList} 
              addDebit={addDebit}
            />
          }
        />
      </Routes>
    </Router>
  )
}

export default App
