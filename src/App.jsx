import { useState } from 'react'
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
