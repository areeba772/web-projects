import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../App.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    if (!email.includes('@')) {
      return 'Email must contain @ symbol';
    }
    if (!email.includes('.com')) {
      return 'Email must contain .com';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate required fields
    if (!email.trim()) {
      setError('Please fill in the Email field');
      setLoading(false);
      return;
    }

    if (!password) {
      setError('Please fill in the Password field');
      setLoading(false);
      return;
    }

    // Validate email
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      setLoading(false);
      return;
    }

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="container" style={{ maxWidth: '500px', marginTop: '100px' }}>
      <div className="card">
        <h2 className="card-header">Login</h2>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="example@email.com"
            />
            <small style={{ color: '#666', fontSize: '12px' }}>Must contain @ and .com</small>
          </div>
          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                const value = e.target.value;
                // Only allow numbers
                if (value === '' || /^\d+$/.test(value)) {
                  setPassword(value);
                }
              }}
              required
              maxLength={6}
              placeholder="6 digits only (e.g., 123456)"
            />
            <small style={{ color: '#666', fontSize: '12px' }}>Must be exactly 6 digits (numbers only, e.g., 123456)</small>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p style={{ marginTop: '20px', textAlign: 'center' }}>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

