import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const ReportLost = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    image: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [matchingItems, setMatchingItems] = useState([]);
  const [showMatching, setShowMatching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (formData.name.length > 2) {
      fetchMatchingItems();
    } else {
      setMatchingItems([]);
    }
  }, [formData.name]);

  const fetchMatchingItems = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/matching/found/${encodeURIComponent(formData.name)}`);
      setMatchingItems(res.data.data);
      setShowMatching(res.data.data.length > 0);
    } catch (error) {
      console.error('Error fetching matching items:', error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validate required fields
    if (!formData.name.trim()) {
      setError('Please fill in the Item Name field');
      setLoading(false);
      return;
    }

    if (!formData.description.trim()) {
      setError('Please fill in the Description field');
      setLoading(false);
      return;
    }

    if (!formData.location.trim()) {
      setError('Please fill in the Location field');
      setLoading(false);
      return;
    }

    if (!formData.date) {
      setError('Please fill in the Date field');
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('location', formData.location);
      data.append('date', formData.date);
      if (formData.image) {
        data.append('image', formData.image);
      }

      await axios.post('http://localhost:5000/api/lost-items', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setSuccess('Lost item reported successfully!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to report lost item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px', marginTop: '50px' }}>
      <div className="card">
        <h2 className="card-header">Report Lost Item</h2>
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Item Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., iPhone 12, Wallet, Keys"
            />
            {showMatching && matchingItems.length > 0 && (
              <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#d4edda', borderRadius: '5px', border: '1px solid #28a745' }}>
                <strong style={{ color: '#155724' }}>✅ Possible Matches Found!</strong>
                <p style={{ marginTop: '10px', marginBottom: '10px', color: '#155724' }}>
                  We found {matchingItems.length} found item(s) with similar name. Your item might be found:
                </p>
                {matchingItems.slice(0, 3).map(item => (
                  <div key={item._id} style={{ marginBottom: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '5px' }}>
                    <strong>{item.name}</strong> - Found at {item.location} on {formatDate(item.date)}
                    {item.reporterPhone && (
                      <div style={{ marginTop: '5px' }}>
                        <a href={`tel:${item.reporterPhone}`} className="btn btn-success" style={{ fontSize: '12px', padding: '5px 10px', marginRight: '5px' }}>
                          📞 Call Finder
                        </a>
                        <a href={`mailto:${item.reporterEmail}`} className="btn btn-primary" style={{ fontSize: '12px', padding: '5px 10px' }}>
                          📧 Email
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe the item in detail..."
            />
          </div>
          <div className="form-group">
            <label>Location *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Where did you lose it?"
            />
          </div>
          <div className="form-group">
            <label>Date Lost *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Item Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
            />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Report Lost Item'}
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

export default ReportLost;

