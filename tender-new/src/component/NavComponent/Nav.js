import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Nav({ token, role, sidebarOpen, onClose }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Accordion open states for the sidebar dropdowns
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Auto-expand accordion if current page is inside the dropdown
  useEffect(() => {
    const path = location.pathname;
    if (path === '/addcategory' || path === '/addsubcategory') {
      setCategoriesOpen(true);
    }
    if (['/epadmin', '/cpadmin', '/epuser', '/cpuser'].includes(path)) {
      setSettingsOpen(true);
    }
    // Close mobile public hamburger menu on route changes
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  // ---------------- PUBLIC HORIZONTAL HEADER (Logged out) ----------------
  if (!token) {
    const navClass = "custom-navbar bg-white border-b border-slate-200 flex items-center px-4 lg:px-8 w-full shadow-sm";
    
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
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-2">
            <Link to="/about" className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/about') ? 'text-[#d97706]' : 'text-slate-600 hover:text-[#d97706]'}`}>
              About
            </Link>
            <Link to="/services" className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/services') ? 'text-[#d97706]' : 'text-slate-600 hover:text-[#d97706]'}`}>
              Services
            </Link>
            <Link to="/register" className="px-4 py-2 rounded-lg text-sm font-semibold border border-[#d97706]/30 text-[#d97706] hover:bg-[#d97706]/10 transition-colors">
              Register
            </Link>
            <Link to="/login" className="px-5 py-2 rounded-lg text-sm font-semibold bg-[#d97706] text-white hover:bg-[#b45309] transition-colors">
              Login
            </Link>
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
            <Link to="/about" className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${isActive('/about') ? 'text-[#d97706] bg-slate-50' : 'text-slate-600 hover:text-slate-900'}`}>
              About
            </Link>
            <Link to="/services" className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${isActive('/services') ? 'text-[#d97706] bg-slate-50' : 'text-slate-600 hover:text-slate-900'}`}>
              Services
            </Link>
            <Link to="/register" className="w-full text-center block px-4 py-2.5 rounded-lg text-sm font-semibold border border-[#d97706]/30 text-[#d97706] bg-[#d97706]/5 hover:bg-[#d97706]/10">
              Register
            </Link>
            <Link to="/login" className="w-full text-center block px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#d97706] text-white hover:bg-[#b45309]">
              Login
            </Link>
          </div>
        )}
      </div>
    );
  }

  // ---------------- AUTHENTICATED SIDEBAR (Admin / User) ----------------
  const isAdmin = role === "admin";
  const userEmail = localStorage.getItem("email") || "user@techtender.com";

  // Sidebar contents markup
  const sidebarContent = (
    <div className="flex h-full flex-col bg-white">
      {/* Brand Header */}
      <div className="flex h-16 items-center gap-2 border-b border-slate-200 px-6">
        <img 
          src="/logo.png" 
          alt="TechTender Logo" 
          className="w-9 h-9 object-contain" 
        />
        <div className="flex flex-col">
          <span className="font-['Outfit'] font-black text-lg text-slate-800 leading-tight">
            TechTender
          </span>
          <span className="text-[9px] font-bold px-1.5 py-0.5 bg-[#d97706]/10 border border-[#d97706]/20 text-[#d97706] rounded-md tracking-wider uppercase w-max mt-0.5">
            {isAdmin ? 'ADMIN' : 'VENDOR'}
          </span>
        </div>
      </div>

      {/* Navigation Links Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
        {isAdmin ? (
          // Admin Links
          <>
            {/* Dashboard */}
            <Link
              to="/admin"
              className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${isActive('/admin') ? 'bg-[#d97706]/10 text-[#d97706] border border-[#d97706]/20' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
              onClick={onClose}
            >
              <i className="fas fa-tachometer-alt w-5 text-center text-base"></i>
              <span>Dashboard</span>
            </Link>

            {/* Users */}
            <Link
              to="/manageuser"
              className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${isActive('/manageuser') ? 'bg-[#d97706]/10 text-[#d97706] border border-[#d97706]/20' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
              onClick={onClose}
            >
              <i className="fas fa-users w-5 text-center text-base"></i>
              <span>Users</span>
            </Link>

            {/* Categories Accordion */}
            <div className="space-y-1">
              <button
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all duration-200"
              >
                <span className="flex items-center gap-3">
                  <i className="fas fa-folder-open w-5 text-center text-base"></i>
                  <span>Categories</span>
                </span>
                <i className={`fas fa-chevron-down text-xs transition-transform duration-200 ${categoriesOpen ? 'rotate-180' : ''}`}></i>
              </button>
              
              {categoriesOpen && (
                <div className="pl-8 pr-2 py-1 space-y-1 bg-slate-50/50 rounded-lg">
                  <Link 
                    to="/addcategory" 
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${isActive('/addcategory') ? 'text-[#d97706] bg-[#d97706]/5' : 'text-slate-500 hover:text-slate-800'}`}
                    onClick={onClose}
                  >
                    <i className="fas fa-plus-circle text-xs"></i> Add Category
                  </Link>
                  <Link 
                    to="/addsubcategory" 
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${isActive('/addsubcategory') ? 'text-[#d97706] bg-[#d97706]/5' : 'text-slate-500 hover:text-slate-800'}`}
                    onClick={onClose}
                  >
                    <i className="fas fa-layer-group text-xs"></i> Add Subcategory
                  </Link>
                </div>
              )}
            </div>

            {/* Tenders */}
            <Link
              to="/viewp"
              className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${isActive('/viewp') ? 'bg-[#d97706]/10 text-[#d97706] border border-[#d97706]/20' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
              onClick={onClose}
            >
              <i className="fas fa-file-alt w-5 text-center text-base"></i>
              <span>Tenders</span>
            </Link>

            {/* Settings Accordion */}
            <div className="space-y-1">
              <button
                onClick={() => setSettingsOpen(!settingsOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all duration-200"
              >
                <span className="flex items-center gap-3">
                  <i className="fas fa-cog w-5 text-center text-base"></i>
                  <span>Settings</span>
                </span>
                <i className={`fas fa-chevron-down text-xs transition-transform duration-200 ${settingsOpen ? 'rotate-180' : ''}`}></i>
              </button>
              
              {settingsOpen && (
                <div className="pl-8 pr-2 py-1 space-y-1 bg-slate-50/50 rounded-lg">
                  <Link 
                    to="/epadmin" 
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${isActive('/epadmin') ? 'text-[#d97706] bg-[#d97706]/5' : 'text-slate-500 hover:text-slate-800'}`}
                    onClick={onClose}
                  >
                    <i className="fas fa-user-edit text-xs"></i> Edit Profile
                  </Link>
                  <Link 
                    to="/cpadmin" 
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${isActive('/cpadmin') ? 'text-[#d97706] bg-[#d97706]/5' : 'text-slate-500 hover:text-slate-800'}`}
                    onClick={onClose}
                  >
                    <i className="fas fa-key text-xs"></i> Change Password
                  </Link>
                </div>
              )}
            </div>
          </>
        ) : (
          // User / Vendor Links
          <>
            {/* Dashboard */}
            <Link
              to="/user"
              className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${isActive('/user') ? 'bg-[#d97706]/10 text-[#d97706] border border-[#d97706]/20' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
              onClick={onClose}
            >
              <i className="fas fa-tachometer-alt w-5 text-center text-base"></i>
              <span>Dashboard</span>
            </Link>

            {/* Browse Tenders */}
            <Link
              to="/viewcategory"
              className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${isActive('/viewcategory') ? 'bg-[#d97706]/10 text-[#d97706] border border-[#d97706]/20' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
              onClick={onClose}
            >
              <i className="fas fa-search w-5 text-center text-base"></i>
              <span>Browse Tenders</span>
            </Link>

            {/* My Bids */}
            <Link
              to="/viewbidp"
              className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${isActive('/viewbidp') ? 'bg-[#d97706]/10 text-[#d97706] border border-[#d97706]/20' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
              onClick={onClose}
            >
              <i className="fas fa-list w-5 text-center text-base"></i>
              <span>My Bids</span>
            </Link>

            {/* Settings Accordion */}
            <div className="space-y-1">
              <button
                onClick={() => setSettingsOpen(!settingsOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all duration-200"
              >
                <span className="flex items-center gap-3">
                  <i className="fas fa-cog w-5 text-center text-base"></i>
                  <span>Settings</span>
                </span>
                <i className={`fas fa-chevron-down text-xs transition-transform duration-200 ${settingsOpen ? 'rotate-180' : ''}`}></i>
              </button>
              
              {settingsOpen && (
                <div className="pl-8 pr-2 py-1 space-y-1 bg-slate-50/50 rounded-lg">
                  <Link 
                    to="/epuser" 
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${isActive('/epuser') ? 'text-[#d97706] bg-[#d97706]/5' : 'text-slate-500 hover:text-slate-800'}`}
                    onClick={onClose}
                  >
                    <i className="fas fa-user-edit text-xs"></i> Edit Profile
                  </Link>
                  <Link 
                    to="/cpuser" 
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${isActive('/cpuser') ? 'text-[#d97706] bg-[#d97706]/5' : 'text-slate-500 hover:text-slate-800'}`}
                    onClick={onClose}
                  >
                    <i className="fas fa-key text-xs"></i> Change Password
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Footer Profile & Logout Block */}
      <div className="border-t border-slate-200 p-4 space-y-3 bg-[#f8fafc]">
        <div className="flex items-center gap-2.5 px-2">
          <div className="w-9 h-9 rounded-full bg-[#d97706]/10 border border-[#d97706]/35 flex items-center justify-center text-[#d97706] font-bold text-sm flex-shrink-0">
            {userEmail.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-slate-700 truncate">{userEmail}</span>
            <span className="text-[10px] text-slate-400 font-medium capitalize">{role} Account</span>
          </div>
        </div>

        <Link
          to="/logout"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold border border-red-500/20 text-red-500 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/30 transition-all duration-200"
          onClick={onClose}
        >
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. Large Screens Fixed Left Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-slate-200">
        {sidebarContent}
      </aside>

      {/* 2. Mobile Backdrop (slide drawer is open) */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* 3. Mobile Slide-Over Drawer Sidebar Container */}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 transform lg:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {sidebarContent}
      </aside>
    </>
  );
}

export default Nav;
