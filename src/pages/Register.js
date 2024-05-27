// src/RegisterForm.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const [corporateAccountNo, setCorporateAccountNo] = useState('');
  const [corporateName, setCorporateName] = useState('');
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('Maker');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [verification, setVerification] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          corporateAccountNo,
          corporateName,
          userId,
          userName,
          role,
          phoneNumber,
          email,
          verification,
          password
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Registration successful:', data);
    } catch (error) {
      console.log("error", error)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div  className="login-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Corporate Account Number:</label>
          <input
            type="text"
            value={corporateAccountNo}
            onChange={(e) => setCorporateAccountNo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Corporate Name:</label>
          <input
            type="text"
            value={corporateName}
            onChange={(e) => setCorporateName(e.target.value)}
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
          <label>User Name:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select onChange={(e) => setRole(e.target.value)}>
            <option value="Maker">Maker</option>
            <option value="Approver">Approver</option>
          </select>
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Verification:</label>
          <input
            type="text"
            value={verification}
            onChange={(e) => setVerification(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Repeat Password:</label>
          <input
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
          />
        </div>
        {password !== repeatPassword && (<p className="error">Ensure that your password is the same</p>)}
        {error && <div className="error">{error}</div>}
        <div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>

      <div>
        Already have an account? <Link to="/login">Login Now</Link>
      </div>
    </div>
  );
};

export default RegisterForm;
