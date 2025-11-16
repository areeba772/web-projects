import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import '../App.css';

const Profile = () => {
  const { user, login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    setSuccess('');
    setLoading(true);

    // Validate required fields
    if (!formData.name.trim()) {
      setError('Please fill in the Name field');
      setLoading(false);
      return;
    }

    // Validate phone if provided
    if (formData.phone) {
      const phoneError = validatePhone(formData.phone);
      if (phoneError) {
        setError(phoneError);
        setLoading(false);
        return;
      }
    }

    try {
      const res = await axios.put('http://localhost:5000/api/auth/profile', {
        name: formData.name,
        phone: formData.phone
      });

      setSuccess('Profile updated successfully!');
      
      // Update user in context
      const updatedUser = {
        ...user,
        name: res.data.user.name,
        phone: res.data.user.phone
      };
      
      // Refresh user data
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px', marginTop: '50px' }}>
      <div className="card">
        <h2 className="card-header">My Profile</h2>
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
            />
            <small style={{ color: '#666', fontSize: '12px' }}>Email cannot be changed</small>
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="923095851717 (92 + 10 digits = 12 total)"
              maxLength={15}
            />
            <small style={{ color: '#666', fontSize: '12px' }}>Format: 92XXXXXXXXXX (92 + 10 digits = 12 digits total, e.g., 923095851717)</small>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;

