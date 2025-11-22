import './ManageUser.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { __urlapi } from '../../API_URL';

function ManageUser() {
  const [userDetails, setUserDetails] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [searchTerm, statusFilter, userDetails]);

  const fetchUsers = () => {
    setLoading(true);
    var condition_obj = { "role": "user" };
    axios.get(__urlapi + "fetch", {
      params: { condition_obj: condition_obj }
    }).then((response) => {
      setUserDetails(response.data);
      setFilteredUsers(response.data);
      setLoading(false);
    }).catch((error) => {
      console.log(error);
      setLoading(false);
    });
  };

  const filterUsers = () => {
    let filtered = userDetails;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.mobile?.includes(searchTerm) ||
        user.city?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user =>
        statusFilter === 'verified' ? user.status === 1 : user.status === 0
      );
    }

    setFilteredUsers(filtered);
  };

  const changestatususer = (_id, s) => {
    if (s == "verify") {
      var update_details = { "condition_obj": { "_id": _id }, "content_obj": { "status": 1 } };
      axios.patch(__urlapi + "update", update_details).then(() => {
        showNotification("User verified successfully!");
        fetchUsers();
      });
    }
    else if (s == "block") {
      var update_details = { "condition_obj": { "_id": _id }, "content_obj": { "status": 0 } };
      axios.patch(__urlapi + "update", update_details).then(() => {
        showNotification("User blocked successfully!");
        fetchUsers();
      });
    }
    else {
      if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
        var delete_details = { "data": { "_id": _id } };
        axios.delete(__urlapi + "delete", delete_details).then(() => {
          showNotification("User deleted successfully!");
          fetchUsers();
        });
      }
    }
  };

  const showNotification = (message) => {
    // Simple notification - you can enhance this with a toast library
    alert(message);
  };


  return (
    <>
      {/* Header Section */}
      <div className="manage-user-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="text-white mb-2">
                <i className="fas fa-users-cog me-3"></i>
                User Management
              </h1>
              <p className="text-white mb-0">
                Monitor and manage all registered users
              </p>
            </div>
            <div className="col-lg-6 text-lg-end">
              <div className="user-stats">
                <div className="stat-item">
                  <i className="fas fa-users"></i>
                  <span>{userDetails.length} Total Users</span>
                </div>
                <div className="stat-item">
                  <i className="fas fa-check-circle"></i>
                  <span>{userDetails.filter(u => u.status === 1).length} Verified</span>
                </div>
                <div className="stat-item">
                  <i className="fas fa-ban"></i>
                  <span>{userDetails.filter(u => u.status === 0).length} Blocked</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="container my-4">
        <div className="manage-user-controls">
          <div className="row g-3 align-items-center">
            <div className="col-lg-5">
              <div className="search-box">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name, email, mobile, or city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <i 
                    className="fas fa-times clear-search" 
                    onClick={() => setSearchTerm('')}
                  ></i>
                )}
              </div>
            </div>
            <div className="col-lg-3">
              <select
                className="form-select filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Users</option>
                <option value="verified">Verified Only</option>
                <option value="blocked">Blocked Only</option>
              </select>
            </div>
            <div className="col-lg-4 text-lg-end">
              <div className="view-toggle">
                <button
                  className={`btn-view ${viewMode === 'table' ? 'active' : ''}`}
                  onClick={() => setViewMode('table')}
                >
                  <i className="fas fa-table"></i> Table
                </button>
                <button
                  className={`btn-view ${viewMode === 'cards' ? 'active' : ''}`}
                  onClick={() => setViewMode('cards')}
                >
                  <i className="fas fa-th-large"></i> Cards
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mb-5">
        {loading ? (
          <div className="loading-state">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading users...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-user-slash"></i>
            <h3>No Users Found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : viewMode === 'table' ? (
          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th><i className="fas fa-id-badge me-2"></i>User ID</th>
                  <th><i className="fas fa-user me-2"></i>Name</th>
                  <th><i className="fas fa-envelope me-2"></i>Email</th>
                  <th><i className="fas fa-phone me-2"></i>Mobile</th>
                  <th><i className="fas fa-map-marker-alt me-2"></i>City</th>
                  <th><i className="fas fa-venus-mars me-2"></i>Gender</th>
                  <th><i className="fas fa-info-circle me-2"></i>Status</th>
                  <th><i className="fas fa-cogs me-2"></i>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((row) => (
                  <tr key={row._id}>
                    <td>
                      <span className="user-id">{String(row._id).substring(0, 8)}...</span>
                    </td>
                    <td>
                      <div className="user-name-cell">
                        <div className="user-avatar">
                          {row.name?.charAt(0).toUpperCase()}
                        </div>
                        <span>{row.name}</span>
                      </div>
                    </td>
                    <td>{row.email}</td>
                    <td>{row.mobile}</td>
                    <td>{row.city}</td>
                    <td>
                      <span className="gender-badge">
                        <i className={`fas fa-${row.gender === 'male' ? 'mars' : 'venus'} me-1`}></i>
                        {row.gender}
                      </span>
                    </td>
                    <td>
                      {row.status === 1 ? (
                        <span className="status-badge verified">
                          <i className="fas fa-check-circle me-1"></i>
                          Verified
                        </span>
                      ) : (
                        <span className="status-badge blocked">
                          <i className="fas fa-ban me-1"></i>
                          Blocked
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="action-buttons">
                        {row.status === 1 ? (
                          <button
                            className="btn-action btn-block"
                            onClick={() => changestatususer(row._id, 'block')}
                            title="Block User"
                          >
                            <i className="fas fa-ban"></i>
                          </button>
                        ) : (
                          <button
                            className="btn-action btn-verify"
                            onClick={() => changestatususer(row._id, 'verify')}
                            title="Verify User"
                          >
                            <i className="fas fa-check"></i>
                          </button>
                        )}
                        <button
                          className="btn-action btn-delete"
                          onClick={() => changestatususer(row._id, 'delete')}
                          title="Delete User"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="row g-4">
            {filteredUsers.map((row) => (
              <div className="col-lg-4 col-md-6" key={row._id}>
                <div className="user-card">
                  <div className="user-card-header">
                    <div className="user-avatar-large">
                      {row.name?.charAt(0).toUpperCase()}
                    </div>
                    {row.status === 1 ? (
                      <span className="status-badge verified">
                        <i className="fas fa-check-circle me-1"></i>
                        Verified
                      </span>
                    ) : (
                      <span className="status-badge blocked">
                        <i className="fas fa-ban me-1"></i>
                        Blocked
                      </span>
                    )}
                  </div>
                  <div className="user-card-body">
                    <h4>{row.name}</h4>
                    <div className="user-info">
                      <div className="info-item">
                        <i className="fas fa-envelope"></i>
                        <span>{row.email}</span>
                      </div>
                      <div className="info-item">
                        <i className="fas fa-phone"></i>
                        <span>{row.mobile}</span>
                      </div>
                      <div className="info-item">
                        <i className="fas fa-map-marker-alt"></i>
                        <span>{row.city}</span>
                      </div>
                      <div className="info-item">
                        <i className={`fas fa-${row.gender === 'male' ? 'mars' : 'venus'}`}></i>
                        <span>{row.gender}</span>
                      </div>
                      {row.info && (
                        <div className="info-item full-width">
                          <i className="fas fa-info-circle"></i>
                          <span>{row.info}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="user-card-footer">
                    {row.status === 1 ? (
                      <button
                        className="btn-card-action btn-block"
                        onClick={() => changestatususer(row._id, 'block')}
                      >
                        <i className="fas fa-ban me-2"></i>
                        Block User
                      </button>
                    ) : (
                      <button
                        className="btn-card-action btn-verify"
                        onClick={() => changestatususer(row._id, 'verify')}
                      >
                        <i className="fas fa-check me-2"></i>
                        Verify User
                      </button>
                    )}
                    <button
                      className="btn-card-action btn-delete"
                      onClick={() => changestatususer(row._id, 'delete')}
                    >
                      <i className="fas fa-trash me-2"></i>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default ManageUser;
