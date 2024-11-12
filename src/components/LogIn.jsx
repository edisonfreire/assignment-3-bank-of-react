import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function LogIn({ user, mockLogIn }) {
  const [userName, setUserName] = useState(user.userName || '');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mockLogIn({ userName, password });
    navigate('/userProfile');
  };

  return (
    <div>
      <h1>Login</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>User Name</label>
          <input
            type="text"
            name="userName"
            value={userName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>Log In</button>
      </form>
      <br />
      <Link to="/">Return to Home</Link>
    </div>
  )
}

export default LogIn