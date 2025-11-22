import './Admin.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { __productapiurl, __categoryapiurl } from '../../API_URL';

function Admin() {
  const [stats, setStats] = useState({
    totalTenders: 0,
    totalCategories: 0,
    totalUsers: 0,
    totalBids: 0
  });

  useEffect(() => {
    // Fetch statistics
    Promise.all([
      axios.get(__productapiurl + "fetch").catch(() => ({ data: [] })),
      axios.get(__categoryapiurl + "fetch").catch(() => ({ data: [] }))
    ]).then(([tenders, categories]) => {
      setStats({
        totalTenders: tenders.data.length || 0,
        totalCategories: categories.data.length || 0,
        totalUsers: 0, // Can be updated with actual user count
        totalBids: 0    // Can be updated with actual bid count
      });
    });
  }, []);

  return (
    <>
      {/* Welcome Banner */}
      <div className="admin-banner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="text-white mb-2">
                <i className="fa fa-user-shield me-3"></i>
                Admin Dashboard
              </h1>
              <p className="text-white mb-0 fs-5">
                Manage tenders, categories, and users from one central location
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <div className="admin-time">
                <i className="fa fa-clock me-2"></i>
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container my-5">
        <div className="row g-4">
          <div className="col-lg-3 col-md-6">
            <div className="admin-stat-card stat-primary">
              <div className="stat-icon">
                <i className="fa fa-file-alt fa-2x"></i>
              </div>
              <div className="stat-content">
                <h3>{stats.totalTenders}</h3>
                <p>Total Tenders</p>
              </div>
              <div className="stat-action">
                <Link to="/viewp">
                  <i className="fa fa-plus-circle"></i>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="admin-stat-card stat-success">
              <div className="stat-icon">
                <i className="fa fa-folder fa-2x"></i>
              </div>
              <div className="stat-content">
                <h3>{stats.totalCategories}</h3>
                <p>Categories</p>
              </div>
              <div className="stat-action">
                <Link to="/addcategory">
                  <i className="fa fa-plus-circle"></i>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="admin-stat-card stat-warning">
              <div className="stat-icon">
                <i className="fa fa-users fa-2x"></i>
              </div>
              <div className="stat-content">
                <h3>{stats.totalUsers}</h3>
                <p>Registered Users</p>
              </div>
              <div className="stat-action">
                <Link to="/manageuser">
                  <i className="fa fa-eye"></i>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="admin-stat-card stat-info">
              <div className="stat-icon">
                <i className="fa fa-gavel fa-2x"></i>
              </div>
              <div className="stat-content">
                <h3>{stats.totalBids}</h3>
                <p>Total Bids</p>
              </div>
              <div className="stat-action">
                <i className="fa fa-chart-line"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="container mb-5">
        <div className="section-header mb-4">
          <h2>
            <i className="fa fa-bolt me-2"></i>Quick Actions
          </h2>
        </div>
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <Link to="/addcategory" className="admin-action-card">
              <div className="action-icon bg-primary">
                <i className="fa fa-folder-plus fa-3x"></i>
              </div>
              <h4>Add Category</h4>
              <p>Create new tender categories</p>
              <div className="action-arrow">
                <i className="fa fa-arrow-right"></i>
              </div>
            </Link>
          </div>

          <div className="col-lg-4 col-md-6">
            <Link to="/addsubcategory" className="admin-action-card">
              <div className="action-icon bg-success">
                <i className="fa fa-sitemap fa-3x"></i>
              </div>
              <h4>Add Subcategory</h4>
              <p>Create subcategories for organization</p>
              <div className="action-arrow">
                <i className="fa fa-arrow-right"></i>
              </div>
            </Link>
          </div>

          <div className="col-lg-4 col-md-6">
            <Link to="/viewp" className="admin-action-card">
              <div className="action-icon bg-warning">
                <i className="fa fa-plus-circle fa-3x"></i>
              </div>
              <h4>Add Tender</h4>
              <p>Post new tender opportunities</p>
              <div className="action-arrow">
                <i className="fa fa-arrow-right"></i>
              </div>
            </Link>
          </div>

          <div className="col-lg-4 col-md-6">
            <Link to="/manageuser" className="admin-action-card">
              <div className="action-icon bg-info">
                <i className="fa fa-users-cog fa-3x"></i>
              </div>
              <h4>Manage Users</h4>
              <p>View and manage user accounts</p>
              <div className="action-arrow">
                <i className="fa fa-arrow-right"></i>
              </div>
            </Link>
          </div>

          <div className="col-lg-4 col-md-6">
            <Link to="/epadmin" className="admin-action-card">
              <div className="action-icon bg-danger">
                <i className="fa fa-user-edit fa-3x"></i>
              </div>
              <h4>Edit Profile</h4>
              <p>Update your admin profile</p>
              <div className="action-arrow">
                <i className="fa fa-arrow-right"></i>
              </div>
            </Link>
          </div>

          <div className="col-lg-4 col-md-6">
            <Link to="/cpadmin" className="admin-action-card">
              <div className="action-icon bg-secondary">
                <i className="fa fa-key fa-3x"></i>
              </div>
              <h4>Change Password</h4>
              <p>Update your security credentials</p>
              <div className="action-arrow">
                <i className="fa fa-arrow-right"></i>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="container mb-5">
        <div className="admin-info-card">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h3 className="mb-3">
                <i className="fa fa-info-circle me-2"></i>
                System Information
              </h3>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="info-item">
                    <i className="fa fa-check-circle text-success me-2"></i>
                    <span>System Status: <strong>Online</strong></span>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="info-item">
                    <i className="fa fa-database text-primary me-2"></i>
                    <span>Database: <strong>Connected</strong></span>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="info-item">
                    <i className="fa fa-shield-alt text-success me-2"></i>
                    <span>Security: <strong>Active</strong></span>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="info-item">
                    <i className="fa fa-server text-info me-2"></i>
                    <span>Server: <strong>Running</strong></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 text-center">
              <div className="system-status">
                <i className="fa fa-check-circle fa-4x text-success mb-3"></i>
                <h5>All Systems Operational</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="container mb-5">
        <div className="admin-help-section">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h3 className="mb-2">Need Help?</h3>
              <p className="mb-0">Check our documentation or contact support for assistance with admin tasks.</p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <Link to="/contact" className="btn btn-outline-light btn-lg">
                <i className="fa fa-question-circle me-2"></i>Get Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
