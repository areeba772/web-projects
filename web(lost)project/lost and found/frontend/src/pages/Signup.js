import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../App.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useContext(AuthContext);
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

  const validatePassword = (password) => {
    if (password.length !== 6) {
      return 'Password must be exactly 6 digits';
    }
    if (!/^\d+$/.test(password)) {
      return 'Password must contain only numbers (e.g., 123456)';
    }
    return null;
  };

  const validatePhone = (phone) => {
    if (!phone) return null; // Phone is optional
    const cleaned = phone.replace(/[^0-9]/g, '');
    if (!cleaned.startsWith('92')) {
      return 'Phone number must start with 92';
    }
    if (cleaned.length !== 12) {
      return 'Phone number must have 12 digits total: 92 + 10 digits (e.g., 923095851717)';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate required fields
    if (!name.trim()) {
      setError('Please fill in the Name field');
      setLoading(false);
      return;
    }

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

    // Validate password
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      setLoading(false);
      return;
    }

    // Validate phone if provided
    if (phone) {
      const phoneError = validatePhone(phone);
      if (phoneError) {
        setError(phoneError);
        setLoading(false);
        return;
      }
    }

    const result = await signup(name, email, password, phone);
    
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
        <h2 className="card-header">Sign Up</h2>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
            />
          </div>
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
          <div className="form-group">
            <label>Phone Number (Optional)</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="923095851717 (92 + 10 digits = 12 total)"
              maxLength={15}
            />
            <small style={{ color: '#666', fontSize: '12px' }}>Format: 92XXXXXXXXXX (92 + 10 digits = 12 digits total, e.g., 923095851717)</small>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <p style={{ marginTop: '20px', textAlign: 'center' }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

