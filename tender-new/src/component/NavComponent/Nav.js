import './Nav.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Nav() {
  const [navContent, setNavContent] = useState();

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
                  <a className="navbar-brand" href="#">
                    <h4 className="text-gray m-0">
                      <i className="fas fa-shield-alt me-2"></i>
                      TECHSOL <span className="admin-badge">ADMIN</span>
                    </h4>
                  </a>

                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>

                  <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-lg-center">
                      <li className="nav-item">
                        <Link to="/admin" className="nav-link text-dark px-2 py-2 rounded-3 hover-link">
                          <i className="fas fa-tachometer-alt me-1"></i>
                          <span className="nav-text">Dashboard</span>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/manageuser" className="nav-link text-dark px-2 py-2 rounded-3 hover-link">
                          <i className="fas fa-users-cog me-1"></i>
                          <span className="nav-text">Users</span>
                        </Link>
                      </li>

                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle text-dark px-2 py-2 rounded-3 hover-link"
                          href="#"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="fas fa-folder-tree me-1"></i>
                          <span className="nav-text">Categories</span>
                        </a>
                        <ul className="dropdown-menu">
                          <li>
                            <Link className="dropdown-item" to="/addcategory">
                              <i className="fas fa-plus-circle me-2"></i>
                              Add Category
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/addsubcategory">
                              <i className="fas fa-layer-group me-2"></i>
                              Add Subcategory
                            </Link>
                          </li>
                        </ul>
                      </li>

                      <li className="nav-item">
                        <Link to="/viewp" className="nav-link text-dark px-2 py-2 rounded-3 hover-link">
                          <i className="fas fa-file-contract me-1"></i>
                          <span className="nav-text">Tenders</span>
                        </Link>
                      </li>

                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle text-dark px-2 py-2 rounded-3 hover-link"
                          href="#"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="fas fa-cog me-1"></i>
                          <span className="nav-text">Settings</span>
                        </a>
                        <ul className="dropdown-menu">
                          <li>
                            <Link className="dropdown-item" to="/epadmin">
                              <i className="fas fa-user-edit me-2"></i>
                              Edit Profile
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/cpadmin">
                              <i className="fas fa-key me-2"></i>
                              Change Password
                            </Link>
                          </li>
                        </ul>
                      </li>

                      <li className="nav-item">
                        <Link to="/logout" className="nav-link logout-link px-2 py-2 rounded-3">
                          <i className="fas fa-sign-out-alt me-1"></i>
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
            {/* Navbar Start */}

            <div className="container-fluid nav-bar bg-light">
              <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm p-3 py-lg-0 px-lg-4">
                <div className="container-fluid">
                  <a className="navbar-brand" href="#">
                    <h4 className="text-gray m-0">
                      TECHSOL
                    </h4>
                  </a>

                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>

                  <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                      <li className="nav-item ms-2 me-2">
                        <Link
                          to="/user"
                          className="nav-link text-dark px-3 py-2 rounded-3 hover-link"
                        >
                          <i className="fas fa-home me-2"></i>
                          Dashboard
                        </Link>
                      </li>

                      <li className="nav-item ms-2 me-2">
                        <Link
                          to="/viewcategory"
                          className="nav-link text-dark px-3 py-2 rounded-3 hover-link"
                        >
                          <i className="fas fa-search me-2"></i>
                          Browse Tenders
                        </Link>
                      </li>

                      <li className="nav-item ms-2 me-2">
                        <Link
                          to="/viewbidp"
                          className="nav-link text-dark px-3 py-2 rounded-3 hover-link"
                        >
                          <i className="fas fa-gavel me-2"></i>
                          My Bids
                        </Link>
                      </li>

                      <li className="nav-item dropdown ms-2 me-2">
                        <a
                          className="nav-link dropdown-toggle text-dark px-3 py-2 rounded-3 hover-link"
                          href="#"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="fas fa-cog me-2"></i>
                          Settings
                        </a>
                        <ul className="dropdown-menu">
                          <li>
                            <Link className="dropdown-item" to="/epuser">
                              <i className="fas fa-user-edit me-2"></i>
                              Edit Profile
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/cpuser">
                              <i className="fas fa-key me-2"></i>
                              Change Password
                            </Link>
                          </li>
                        </ul>
                      </li>

                      <li className="nav-item ms-2 me-2">
                        <Link
                          to="/logout"
                          className="nav-link text-dark px-3 py-2 rounded-3 hover-link logout-link"
                        >
                          <i className="fas fa-sign-out-alt me-2"></i>
                          Logout
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
            {/* Navbar Start */}
            <div class="container-fluid nav-bar bg-light">
              <nav class="navbar navbar-expand-lg navbar-light bg-white p-3 py-lg-0 px-lg-4">

                <div class="container-fluid">
                  <a class="navbar-brand" href="#"> <h4 className="text-gray m-0">TECHSOL </h4></a>
                  {/* <a className="navbar-brand text-brand" href="index.html">TEN<span className="color-b">DER</span></a> */}

                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                      <li class="nav-item ms-2 me-2">
                        <Link to="/" class="nav-link text-dark px-3 py-2 rounded-3 hover-link">
                          <i className="fas fa-home me-2"></i>
                          Home
                        </Link>
                      </li>
                      <li class="nav-item ms-2 me-2">
                        <Link to="/about" class="nav-link text-dark px-3 py-2 rounded-3 hover-link">
                          <i className="fas fa-info-circle me-2"></i>
                          About
                        </Link>
                      </li>
                      <li class="nav-item ms-2 me-2">
                        <Link to="/services" class="nav-link text-dark px-3 py-2 rounded-3 hover-link">
                          <i className="fas fa-briefcase me-2"></i>
                          Services
                        </Link>
                      </li>
                      <li class="nav-item ms-2 me-2">
                        <Link to="/register" class="nav-link text-dark px-3 py-2 rounded-3 hover-link register-link">
                          <i className="fas fa-user-plus me-2"></i>
                          Register
                        </Link>
                      </li>
                      <li class="nav-item ms-2 me-2">
                        <Link to="/login" class="nav-link text-dark px-3 py-2 rounded-3 hover-link login-link">
                          <i className="fas fa-sign-in-alt me-2"></i>
                          Login
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
