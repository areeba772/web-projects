import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const Dashboard = () => {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const [lostRes, foundRes] = await Promise.all([
        axios.get('http://localhost:5000/api/lost-items'),
        axios.get('http://localhost:5000/api/found-items')
      ]);
      setLostItems(lostRes.data.data);
      setFoundItems(foundRes.data.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
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

  const renderItem = (item, type) => (
    <div key={item._id} className="item-card">
      {item.image && (
        <img
          src={`http://localhost:5000${item.image}`}
          alt={item.name}
          className="item-image"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      )}
      <div className="item-content">
        <div className="item-name">{item.name}</div>
        <div className="item-description">{item.description}</div>
        <div className="item-details">
          <strong>Reported by:</strong> {item.reporterName}
        </div>
        <div className="item-details">
          <strong>Date:</strong> {formatDate(item.date)}
        </div>
        <div className="item-details item-location">
          <strong>Location:</strong> {item.location}
        </div>
        <span className={`badge badge-${type}`}>
          {type === 'lost' ? 'Lost' : 'Found'}
        </span>
        <div className="contact-buttons" style={{ marginTop: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {(() => {
            const email = item.reporterEmail || (item.reportedBy && item.reportedBy.email);
            const phone = item.reporterPhone || (item.reportedBy && item.reportedBy.phone);
            
            return (
              <>
                {email && email.trim() && email.includes('@') && (
                  <a
                    href={`mailto:${email.trim()}`}
                    className="btn btn-primary"
                    style={{ fontSize: '14px', padding: '8px 15px', textDecoration: 'none' }}
                    onClick={(e) => {
                      if (!email || !email.trim() || !email.includes('@')) {
                        e.preventDefault();
                        alert('Email not available');
                      }
                    }}
                  >
                    📧 Email
                  </a>
                )}
                {phone && phone.trim() && (
                  <>
                    <a
                      href={`tel:${phone.trim()}`}
                      className="btn btn-success"
                      style={{ fontSize: '14px', padding: '8px 15px', textDecoration: 'none' }}
                    >
                      📞 Call
                    </a>
                    <a
                      href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn"
                      style={{ fontSize: '14px', padding: '8px 15px', backgroundColor: '#25D366', color: 'white', textDecoration: 'none' }}
                    >
                      💬 WhatsApp
                    </a>
                  </>
                )}
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <div className="loading">Loading items...</div>;
  }

  const allItems = [
    ...lostItems.map(item => ({ ...item, type: 'lost' })),
    ...foundItems.map(item => ({ ...item, type: 'found' }))
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const displayedItems = activeTab === 'all' 
    ? allItems 
    : activeTab === 'lost' 
    ? lostItems.map(item => ({ ...item, type: 'lost' }))
    : foundItems.map(item => ({ ...item, type: 'found' }));

  return (
    <div className="container">
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '40px',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <h1 style={{ 
          fontSize: '42px', 
          fontWeight: '800',
          background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          margin: 0,
          textShadow: '0 2px 20px rgba(255, 255, 255, 0.3)',
          letterSpacing: '-1px'
        }}>
          Lost & Found Dashboard
        </h1>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link to="/report-lost" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            📝 Report Lost Item
          </Link>
          <Link to="/report-found" className="btn btn-success" style={{ textDecoration: 'none' }}>
            ✅ Report Found Item
          </Link>
        </div>
      </div>

      <div style={{ 
        marginBottom: '30px', 
        display: 'flex', 
        gap: '12px',
        flexWrap: 'wrap',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        padding: '12px',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <button
          className={`btn ${activeTab === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('all')}
          style={{ 
            minWidth: '120px',
            transition: 'all 0.3s ease'
          }}
        >
          🔍 All Items
        </button>
        <button
          className={`btn ${activeTab === 'lost' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('lost')}
          style={{ 
            minWidth: '150px',
            transition: 'all 0.3s ease'
          }}
        >
          🔴 Lost ({lostItems.length})
        </button>
        <button
          className={`btn ${activeTab === 'found' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('found')}
          style={{ 
            minWidth: '150px',
            transition: 'all 0.3s ease'
          }}
        >
          🟢 Found ({foundItems.length})
        </button>
      </div>

      {displayedItems.length === 0 ? (
        <div className="empty-state">
          <h3>No items found</h3>
          <p>Be the first to report a lost or found item!</p>
        </div>
      ) : (
        <div className="grid">
          {displayedItems.map(item => renderItem(item, item.type))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

