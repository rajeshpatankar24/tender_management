import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

function Nav({ token, role }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const dropdownRef = useRef(null);

  // Close menus on page change or clicking outside
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const isActive = (path) => location.pathname === path;

  const toggleDropdown = (name, e) => {
    e.preventDefault();
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const navClass = "custom-navbar bg-white border-b border-slate-200 flex items-center px-4 lg:px-8 w-full shadow-sm";

  const renderNavLinks = (isMobile) => {
    if (token && role === "admin") {
      return (
        <>
          <Link
            to="/admin"
            className={isMobile
              ? `w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 ${isActive('/admin') ? 'text-[#d97706] bg-[#d97706]/10' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`
              : `flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive('/admin') ? 'bg-[#d97706]/10 text-[#d97706] border border-[#d97706]/20' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`
            }
          >
            <i className="fas fa-tachometer-alt text-xs"></i>
            <span>Dashboard</span>
          </Link>

          <Link
            to="/manageuser"
            className={isMobile
              ? `w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 ${isActive('/manageuser') ? 'text-[#d97706] bg-[#d97706]/10' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`
              : `flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive('/manageuser') ? 'bg-[#d97706]/10 text-[#d97706] border border-[#d97706]/20' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`
            }
          >
            <i className="fas fa-users text-xs"></i>
            <span>Users</span>
          </Link>

          {/* Categories Dropdown */}
          <div className="relative group" ref={isMobile ? null : dropdownRef}>
            <button
              onClick={(e) => toggleDropdown('categories', e)}
              className={isMobile
                ? "w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                : "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200"
              }
            >
              <span className="flex items-center gap-2">
                <i className="fas fa-folder-open text-xs"></i>
                <span>Categories</span>
              </span>
              <i className="fas fa-chevron-down text-[10px] ml-1"></i>
            </button>
            <div className={isMobile
              ? `pl-6 pr-2 py-1 space-y-1 ${activeDropdown === 'categories' ? 'block' : 'hidden'}`
              : `absolute left-0 mt-2 w-48 rounded-lg bg-white border border-slate-200 shadow-2xl p-1.5 space-y-1 transition-all duration-200 z-[1050] origin-top-left ${activeDropdown === 'categories' ? 'scale-100 opacity-100 visible' : 'scale-95 opacity-0 invisible group-hover:scale-100 group-hover:opacity-100 group-hover:visible'}`
            }>
              <Link to="/addcategory" className="flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                <i className="fas fa-plus-circle text-[#d97706]"></i> Add Category
              </Link>
              <Link to="/addsubcategory" className="flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                <i className="fas fa-layer-group text-[#d97706]"></i> Add Subcategory
              </Link>
            </div>
          </div>

          <Link
            to="/viewp"
            className={isMobile
              ? `w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 ${isActive('/viewp') ? 'text-[#d97706] bg-[#d97706]/10' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`
              : `flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive('/viewp') ? 'bg-[#d97706]/10 text-[#d97706] border border-[#d97706]/20' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`
            }
          >
            <i className="fas fa-file-alt text-xs"></i>
            <span>Tenders</span>
          </Link>

          {/* Settings Dropdown */}
          <div className="relative group" ref={isMobile ? null : dropdownRef}>
            <button
              onClick={(e) => toggleDropdown('settings', e)}
              className={isMobile
                ? "w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                : "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200"
              }
            >
              <span className="flex items-center gap-2">
                <i className="fas fa-cog text-xs"></i>
                <span>Settings</span>
              </span>
              <i className="fas fa-chevron-down text-[10px] ml-1"></i>
            </button>
            <div className={isMobile
              ? `pl-6 pr-2 py-1 space-y-1 ${activeDropdown === 'settings' ? 'block' : 'hidden'}`
              : `absolute left-0 mt-2 w-48 rounded-lg bg-white border border-slate-200 shadow-2xl p-1.5 space-y-1 transition-all duration-200 z-[1050] origin-top-left ${activeDropdown === 'settings' ? 'scale-100 opacity-100 visible' : 'scale-95 opacity-0 invisible group-hover:scale-100 group-hover:opacity-100 group-hover:visible'}`
            }>
              <Link to="/epadmin" className="flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                <i className="fas fa-user-edit text-[#d97706]"></i> Profile
              </Link>
              <Link to="/cpadmin" className="flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                <i className="fas fa-key text-[#d97706]"></i> Password
              </Link>
            </div>
          </div>

          <Link
            to="/logout"
            className={isMobile
              ? "w-full text-center block px-4 py-2.5 rounded-lg text-sm font-semibold border border-red-500/30 text-red-500 bg-red-500/5 hover:bg-red-500/10 mt-4"
              : "px-4 py-2 rounded-lg text-sm font-semibold border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors ml-4"
            }
          >
            <i className="fas fa-sign-out-alt mr-1.5"></i>Logout
          </Link>
        </>
      );
    } else if (token && role === "user") {
      return (
        <>
          <Link
            to="/user"
            className={isMobile
              ? `w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 ${isActive('/user') ? 'text-[#d97706] bg-[#d97706]/10' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`
              : `flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive('/user') ? 'bg-[#d97706]/10 text-[#d97706] border border-[#d97706]/20' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`
            }
          >
            <i className="fas fa-tachometer-alt text-xs"></i>
            <span>Dashboard</span>
          </Link>

          <Link
            to="/viewcategory"
            className={isMobile
              ? `w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 ${isActive('/viewcategory') ? 'text-[#d97706] bg-[#d97706]/10' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`
              : `flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive('/viewcategory') ? 'bg-[#d97706]/10 text-[#d97706] border border-[#d97706]/20' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`
            }
          >
            <i className="fas fa-search text-xs"></i>
            <span>Browse</span>
          </Link>

          <Link
            to="/viewbidp"
            className={isMobile
              ? `w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 ${isActive('/viewbidp') ? 'text-[#d97706] bg-[#d97706]/10' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`
              : `flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive('/viewbidp') ? 'bg-[#d97706]/10 text-[#d97706] border border-[#d97706]/20' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`
            }
          >
            <i className="fas fa-list text-xs"></i>
            <span>My Bids</span>
          </Link>

          {/* User Settings Dropdown */}
          <div className="relative group" ref={isMobile ? null : dropdownRef}>
            <button
              onClick={(e) => toggleDropdown('settings', e)}
              className={isMobile
                ? "w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                : "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200"
              }
            >
              <span className="flex items-center gap-2">
                <i className="fas fa-cog text-xs"></i>
                <span>Settings</span>
              </span>
              <i className="fas fa-chevron-down text-[10px] ml-1"></i>
            </button>
            <div className={isMobile
              ? `pl-6 pr-2 py-1 space-y-1 ${activeDropdown === 'settings' ? 'block' : 'hidden'}`
              : `absolute left-0 mt-2 w-48 rounded-lg bg-white border border-slate-200 shadow-2xl p-1.5 space-y-1 transition-all duration-200 z-[1050] origin-top-left ${activeDropdown === 'settings' ? 'scale-100 opacity-100 visible' : 'scale-95 opacity-0 invisible group-hover:scale-100 group-hover:opacity-100 group-hover:visible'}`
            }>
              <Link to="/epuser" className="flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                <i className="fas fa-user-edit text-[#d97706]"></i> Profile
              </Link>
              <Link to="/cpuser" className="flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                <i className="fas fa-key text-[#d97706]"></i> Password
              </Link>
            </div>
          </div>

          <Link
            to="/logout"
            className={isMobile
              ? "w-full text-center block px-4 py-2.5 rounded-lg text-sm font-semibold border border-red-500/30 text-red-500 bg-red-500/5 hover:bg-red-500/10 mt-4"
              : "px-4 py-2 rounded-lg text-sm font-semibold border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors ml-4"
            }
          >
            <i className="fas fa-sign-out-alt mr-1.5"></i>Logout
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link
            to="/about"
            className={isMobile
              ? `w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${isActive('/about') ? 'text-[#d97706] bg-slate-50' : 'text-slate-600 hover:text-slate-900'}`
              : `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/about') ? 'text-[#d97706]' : 'text-slate-600 hover:text-[#d97706]'}`
            }
          >
            About
          </Link>
          <Link
            to="/services"
            className={isMobile
              ? `w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${isActive('/services') ? 'text-[#d97706] bg-slate-50' : 'text-slate-600 hover:text-slate-900'}`
              : `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/services') ? 'text-[#d97706]' : 'text-slate-600 hover:text-[#d97706]'}`
            }
          >
            Services
          </Link>
          <Link
            to="/register"
            className={isMobile
              ? "w-full text-center block px-4 py-2.5 rounded-lg text-sm font-semibold border border-[#d97706]/30 text-[#d97706] bg-[#d97706]/5 hover:bg-[#d97706]/10"
              : "px-4 py-2 rounded-lg text-sm font-semibold border border-[#d97706]/30 text-[#d97706] hover:bg-[#d97706]/10 transition-colors"
            }
          >
            Register
          </Link>
          <Link
            to="/login"
            className={isMobile
              ? "w-full text-center block px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#d97706] text-white hover:bg-[#b45309]"
              : "px-5 py-2 rounded-lg text-sm font-semibold bg-[#d97706] text-white hover:bg-[#b45309] transition-colors"
            }
          >
            Login
          </Link>
        </>
      );
    }
  };

  return (
    <div className={navClass}>
      <div className="w-full flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img 
            src="/logo.png" 
            alt="TechTender Logo" 
            className="w-[38px] h-[38px] object-contain transition-transform duration-200 group-hover:-translate-y-0.5" 
          />
          <div className="flex items-center gap-2">
            <span className="font-['Outfit'] font-bold text-xl text-slate-800 group-hover:text-[#d97706] transition-colors duration-200">
              TechTender
            </span>
            {token && role === "admin" && (
              <span className="text-[9px] font-semibold px-2 py-0.5 bg-[#d97706]/10 border border-[#d97706]/30 text-[#d97706] rounded-md tracking-wider uppercase">
                ADMIN
              </span>
            )}
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-2">
          {renderNavLinks(false)}
        </div>

        {/* Hamburger Toggler */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none transition-colors duration-200"
          aria-label="Toggle navigation menu"
        >
          <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[60px] left-0 right-0 bg-white border-b border-slate-200 px-6 py-5 space-y-3 flex flex-col shadow-2xl z-[1000] animate-fade-in">
          {renderNavLinks(true)}
        </div>
      )}
    </div>
  );
}

export default Nav;
