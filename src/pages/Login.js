// src/LoginForm.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [corporateAccountNo, setCorporateAccountNo] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          corporateAccountNo,
          userId,
          password
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Login successful:', data, data?.user);
      await localStorage.setItem('role', JSON.stringify(data?.data?.user?.role));
      await localStorage.setItem('token', JSON.stringify(data?.data?.user?.token));

      navigate('/transaction');

    } catch (error) {
      console.log("masuk sini", error)
      setError('Failed to login. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Corporate Account No:</label>
          <input
            type="text"
            value={corporateAccountNo}
            onChange={(e) => setCorporateAccountNo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>User ID:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Login Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </div>

      </form>
      <div>
        Without Account? <Link to="/register">Register Now</Link>
      </div>
    </div>
  );
};

export default LoginForm;
