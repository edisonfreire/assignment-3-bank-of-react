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
          element={<Home accountBalance={accountBalance} />} 
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
              accountBalance={accountBalance} 
              setAccountBalance={setAccountBalance} 
            />
          }
        />
        <Route
          path="/debits"
          element={
            <Debits 
              debits={debitList} 
              accountBalance={accountBalance} 
              setAccountBalance={setAccountBalance} 
            />
          }
        />
      </Routes>
    </Router>
  )
}

export default App
