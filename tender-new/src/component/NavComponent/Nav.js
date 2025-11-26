import './Nav.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Nav() {
  const [navContent, setNavContent] = useState();

  // Function to close mobile menu
  const closeMenu = () => {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      const bsCollapse = new window.bootstrap.Collapse(navbarCollapse, {
        toggle: false
      });
      bsCollapse.hide();
    }
  };

  useEffect(() => {
    // Close menu on scroll
    const handleScroll = () => {
      closeMenu();
    };

    // Close menu on outside click
    const handleClickOutside = (event) => {
      const navbar = document.querySelector('.navbar');
      const navbarCollapse = document.getElementById('navbarNav');
      
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        if (navbar && !navbar.contains(event.target)) {
          closeMenu();
        }
      }
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setInterval(() => {

      var token = localStorage.getItem("token");
      var role = localStorage.getItem("role");
      if (token != undefined && role == "admin") {
        setNavContent(
          <>
            {/* Admin Navbar Start */}
            <div className="container-fluid nav-bar bg-light">
              <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm p-3 py-lg-0 px-lg-4">
                <div className="container-fluid">
                  <Link to="/" className="navbar-brand">
                    <div className="brand-logo">
                      <span className="brand-icon">TT</span>
                      <div className="brand-text">
                        <span className="brand-name">TechTender</span>
                        <span className="admin-badge">ADMIN</span>
                      </div>
                    </div>
                  </Link>

                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>

                  <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-lg-center">
                      <li className="nav-item">
                        <Link to="/admin" className="nav-link text-dark px-2 py-2 rounded-3 hover-link" onClick={closeMenu}>
                          <i className="fas fa-tachometer-alt me-2"></i>
                          <span className="nav-text">Dashboard</span>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/manageuser" className="nav-link text-dark px-2 py-2 rounded-3 hover-link" onClick={closeMenu}>
                          <i className="fas fa-users me-2"></i>
                          <span className="nav-text">Users</span>
                        </Link>
                      </li>

                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle text-dark px-2 py-2 rounded-3 hover-link"
                          href="#"
                          role="button"
                          data-bs-toggle="dropdown"
                        >
                          <i className="fas fa-folder-open me-2"></i>
                          <span className="nav-text">Categories</span>
                        </a>
                        <ul className="dropdown-menu">
                          <li>
                            <Link className="dropdown-item" to="/addcategory" onClick={closeMenu}>
                              <i className="fas fa-plus-circle me-2"></i>
                              Add Category
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/addsubcategory" onClick={closeMenu}>
                              <i className="fas fa-layer-group me-2"></i>
                              Add Subcategory
                            </Link>
                          </li>
                        </ul>
                      </li>

                      <li className="nav-item">
                        <Link to="/viewp" className="nav-link text-dark px-2 py-2 rounded-3 hover-link" onClick={closeMenu}>
                          <i className="fas fa-file-alt me-2"></i>
                          <span className="nav-text">Tenders</span>
                        </Link>
                      </li>

                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle text-dark px-2 py-2 rounded-3 hover-link"
                          href="#"
                          role="button"
                          data-bs-toggle="dropdown"
                        >
                          <i className="fas fa-cog me-2"></i>
                          <span className="nav-text">Settings</span>
                        </a>
                        <ul className="dropdown-menu">
                          <li>
                            <Link className="dropdown-item" to="/epadmin" onClick={closeMenu}>
                              <i className="fas fa-user-edit me-2"></i>
                              Profile
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/cpadmin" onClick={closeMenu}>
                              <i className="fas fa-key me-2"></i>
                              Password
                            </Link>
                          </li>
                        </ul>
                      </li>

                      <li className="nav-item">
                        <Link to="/logout" className="nav-link logout-link px-2 py-2 rounded-3" onClick={closeMenu}>
                          <i className="fas fa-sign-out-alt me-2"></i>
                          <span className="nav-text">Logout</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
            {/* Admin Navbar End */}
          </>
        )
      }

      else if (token != undefined && role == "user") {
        setNavContent(
          <>
            {/* User Navbar Start */}
            <div className="container-fluid nav-bar bg-light">
              <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm p-3 py-lg-0 px-lg-4">
                <div className="container-fluid">
                  <Link to="/" className="navbar-brand">
                    <div className="brand-logo">
                      <span className="brand-icon">TT</span>
                      <span className="brand-name">TechTender</span>
                    </div>
                  </Link>

                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>

                  <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                      <li className="nav-item ms-2 me-2">
                        <Link to="/user" className="nav-link text-dark px-3 py-2 rounded-3 hover-link" onClick={closeMenu}>
                          <i className="fas fa-tachometer-alt me-2"></i>
                          <span className="nav-text">Dashboard</span>
                        </Link>
                      </li>

                      <li className="nav-item ms-2 me-2">
                        <Link to="/viewcategory" className="nav-link text-dark px-3 py-2 rounded-3 hover-link" onClick={closeMenu}>
                          <i className="fas fa-search me-2"></i>
                          <span className="nav-text">Browse</span>
                        </Link>
                      </li>

                      <li className="nav-item ms-2 me-2">
                        <Link to="/viewbidp" className="nav-link text-dark px-3 py-2 rounded-3 hover-link" onClick={closeMenu}>
                          <i className="fas fa-list me-2"></i>
                          <span className="nav-text">My Bids</span>
                        </Link>
                      </li>

                      <li className="nav-item dropdown ms-2 me-2">
                        <a
                          className="nav-link dropdown-toggle text-dark px-3 py-2 rounded-3 hover-link"
                          href="#"
                          role="button"
                          data-bs-toggle="dropdown"
                        >
                          <i className="fas fa-cog me-2"></i>
                          <span className="nav-text">Settings</span>
                        </a>
                        <ul className="dropdown-menu">
                          <li>
                            <Link className="dropdown-item" to="/epuser" onClick={closeMenu}>
                              <i className="fas fa-user-edit me-2"></i>
                              Profile
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/cpuser" onClick={closeMenu}>
                              <i className="fas fa-key me-2"></i>
                              Password
                            </Link>
                          </li>
                        </ul>
                      </li>

                      <li className="nav-item ms-2 me-2">
                        <Link to="/logout" className="nav-link text-dark px-3 py-2 rounded-3 hover-link logout-link" onClick={closeMenu}>
                          <i className="fas fa-sign-out-alt me-2"></i>
                          <span className="nav-text">Logout</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </>
        )
      }
      else {
        setNavContent(
          <>
            {/* Guest Navbar Start */}
            <div className="container-fluid nav-bar bg-light">
              <nav className="navbar navbar-expand-lg navbar-light bg-white p-3 py-lg-0 px-lg-4">
                <div className="container-fluid">
                  <Link to="/" className="navbar-brand">
                    <div className="brand-logo">
                      <span className="brand-icon">TT</span>
                      <span className="brand-name">TechTender</span>
                    </div>
                  </Link>

                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>

                  <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                      <li className="nav-item ms-2 me-2">
                        <Link to="/" className="nav-link text-dark px-3 py-2 rounded-3 hover-link" onClick={closeMenu}>
                          <i className="fas fa-home me-2"></i>
                          <span className="nav-text">Home</span>
                        </Link>
                      </li>
                      <li className="nav-item ms-2 me-2">
                        <Link to="/about" className="nav-link text-dark px-3 py-2 rounded-3 hover-link" onClick={closeMenu}>
                          <i className="fas fa-info-circle me-2"></i>
                          <span className="nav-text">About</span>
                        </Link>
                      </li>
                      <li className="nav-item ms-2 me-2">
                        <Link to="/services" className="nav-link text-dark px-3 py-2 rounded-3 hover-link" onClick={closeMenu}>
                          <i className="fas fa-briefcase me-2"></i>
                          <span className="nav-text">Services</span>
                        </Link>
                      </li>
                      <li className="nav-item ms-2 me-2">
                        <Link to="/register" className="nav-link text-dark px-3 py-2 rounded-3 hover-link register-link" onClick={closeMenu}>
                          <i className="fas fa-user-plus me-2"></i>
                          <span className="nav-text">Register</span>
                        </Link>
                      </li>
                      <li className="nav-item ms-2 me-2">
                        <Link to="/login" className="nav-link text-dark px-3 py-2 rounded-3 hover-link login-link" onClick={closeMenu}>
                          <i className="fas fa-sign-in-alt me-2"></i>
                          <span className="nav-text">Login</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
            {/* Navbar End */}
          </>
        )
      }
    }, 1000)
  }, []);

  return (
    <>
      {navContent}
    </>
  );
}

export default Nav;
