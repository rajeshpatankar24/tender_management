import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { __productapiurl } from '../../API_URL';
import { Link } from 'react-router-dom';
import './User.css';

const User = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTenders: 0,
    activeBids: 0,
    wonTenders: 0
  });

  useEffect(() => {
    // Fetch tenders when the component mounts
    setLoading(true);
    axios.get(__productapiurl + "fetch")
      .then(response => {
        setTenders(response.data);
        setStats({
          totalTenders: response.data.length,
          activeBids: 0, // You can update this from actual data
          wonTenders: 0  // You can update this from actual data
        });
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching tenders:", error.message);
        // Set empty array if no data found (404) or other errors
        setTenders([]);
        setStats({
          totalTenders: 0,
          activeBids: 0,
          wonTenders: 0
        });
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* Welcome Banner */}
      <div className="user-banner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="text-white mb-2">
                <i className="fa fa-user-circle me-3"></i>
                Welcome back, {localStorage.getItem('name') || 'User'}!
              </h1>
              <p className="text-white mb-0 fs-5">
                Explore the latest tenders and grow your business
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <Link to="/viewcategory" className="btn btn-light btn-lg me-2">
                <i className="fa fa-search me-2"></i>Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container my-5">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <div className="stat-card stat-card-primary">
              <div className="stat-icon">
                <i className="fa fa-file-alt fa-2x"></i>
              </div>
              <div className="stat-content">
                <h3>{stats.totalTenders}</h3>
                <p>Available Tenders</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="stat-card stat-card-success">
              <div className="stat-icon">
                <i className="fa fa-gavel fa-2x"></i>
              </div>
              <div className="stat-content">
                <h3>{stats.activeBids}</h3>
                <p>Active Bids</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="stat-card stat-card-warning">
              <div className="stat-icon">
                <i className="fa fa-trophy fa-2x"></i>
              </div>
              <div className="stat-content">
                <h3>{stats.wonTenders}</h3>
                <p>Won Tenders</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="container mb-5">
        <div className="quick-actions-card">
          <h4 className="mb-4">
            <i className="fa fa-bolt me-2"></i>Quick Actions
          </h4>
          <div className="row g-3">
            <div className="col-lg-4 col-md-6">
              <Link to="/viewcategory" className="action-btn">
                <i className="fa fa-search fa-2x mb-3"></i>
                <h6>Browse Tenders</h6>
                <p>Find new opportunities</p>
              </Link>
            </div>
            <div className="col-lg-4 col-md-6">
              <Link to="/viewbidp" className="action-btn">
                <i className="fa fa-list fa-2x mb-3"></i>
                <h6>My Bids</h6>
                <p>View your submissions</p>
              </Link>
            </div>
            <div className="col-lg-4 col-md-6">
              <Link to="/epuser" className="action-btn">
                <i className="fa fa-user-cog fa-2x mb-3"></i>
                <h6>Profile Settings</h6>
                <p>Update your info</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Tenders */}
      <div className="container mb-5">
        <div className="section-header">
          <h2>
            <i className="fa fa-fire me-2"></i>Latest Tenders
          </h2>
          <Link to="/viewcategory" className="view-all-link">
            View All <i className="fa fa-arrow-right ms-2"></i>
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading tenders...</p>
          </div>
        ) : tenders.length > 0 ? (
          <div className="row g-4">
            {tenders.slice(0, 6).map((tender) => (
              <div key={tender._id} className="col-lg-6">
                <div className="tender-card-modern">
                  <div className="tender-header">
                    <div className="tender-category">
                      <i className="fa fa-tag me-2"></i>
                      {tender.catnm}
                    </div>
                    <div className="tender-badge">
                      <i className="fa fa-clock me-1"></i>New
                    </div>
                  </div>
                  
                  <h4 className="tender-title">{tender.title}</h4>
                  
                  <p className="tender-description">
                    {tender.description.length > 120 
                      ? tender.description.substring(0, 120) + '...' 
                      : tender.description}
                  </p>
                  
                  <div className="tender-meta">
                    <div className="meta-item">
                      <i className="fa fa-folder me-2"></i>
                      <span>{tender.subcatnm}</span>
                    </div>
                    <div className="meta-item">
                      <i className="fa fa-rupee-sign me-2"></i>
                      <span className="price">₹{tender.baseprice}</span>
                    </div>
                  </div>
                  
                  <div className="tender-footer">
                    <Link 
                      to={`/viewproduct/${tender.subcatnm}`} 
                      className="btn-view-tender"
                    >
                      View Details
                      <i className="fa fa-arrow-right ms-2"></i>
                    </Link>
                    <Link 
                      to={`/bidproduct/${tender._id}`} 
                      className="btn-bid-now"
                    >
                      <i className="fa fa-gavel me-2"></i>
                      Bid Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-tenders">
            <i className="fa fa-inbox fa-4x mb-3"></i>
            <h4>No Tenders Available</h4>
            <p>Check back later for new opportunities</p>
          </div>
        )}
      </div>

      {/* Help Section */}
      <div className="container mb-5">
        <div className="help-section">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h3 className="mb-2">Need Help Getting Started?</h3>
              <p className="mb-0">Our support team is here to assist you with any questions about the bidding process.</p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <Link to="/contact" className="btn btn-outline-light btn-lg">
                <i className="fa fa-headset me-2"></i>Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
