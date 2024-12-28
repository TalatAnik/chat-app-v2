import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser  } = useContext(UserContext);
  const navigate = useNavigate(); // Correctly initialize the navigate function


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login', { username, password });
      const loggedInUser = response.data.token;

      // Save user in context
      setUser(loggedInUser);

      // Save user in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(loggedInUser));

      // Wait for socket initialization

      navigate("/chat"); // Redirect to chat page

    } catch (error) {
      console.error('Login failed', error);
      setError('Invalid username or password');
    }
  };

  
  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
