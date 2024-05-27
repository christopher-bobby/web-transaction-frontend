import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginForm from './pages/Login';
import RegisterForm from './pages/Register';
import Transaction from './pages/Transaction';
import CreateTransaction from './pages/CreateTransaction';


function App() {
  return (
    <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/transaction">Transaction</Link>
          </li>
          <li>
            <Link to="/create-transaction">Create Transaction</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/create-transaction" element={<CreateTransaction />} />

      </Routes>
    </div>
  </Router>
  );
}

export default App;
