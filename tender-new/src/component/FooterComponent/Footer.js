import Newsletter from '../NewsLettercomponent/Newsletter.js';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const currentToken = localStorage.getItem("token");
      const currentRole = localStorage.getItem("role");
      if (currentToken !== token || currentRole !== role) {
        setToken(currentToken);
        setRole(currentRole);
      }
    };

    const interval = setInterval(checkAuth, 500);
    return () => clearInterval(interval);
  }, [token, role]);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.scrollY > 300) {
        setShowScroll(true);
      } else if (showScroll && window.scrollY <= 300) {
        setShowScroll(false);
      }
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLogged = token !== null;

  // Simple Copyright & Attribution section (common to both states)
  const copyrightSection = (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6 border-t border-slate-200 text-xs text-slate-500 font-medium">
        <div>
          &copy; {new Date().getFullYear()} <Link to="/" className="text-slate-600 hover:text-[#d97706] transition-colors">TechTender</Link>. All Rights Reserved.
        </div>
        <div>
          Designed By <span className="text-slate-600 font-semibold">Code-R</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isLogged ? (
        // Clean compact footer for logged in users (in dashboard mode)
        <footer className="bg-[#f1f5f9] border-t border-slate-200 mt-auto">
          {copyrightSection}
        </footer>
      ) : (
        // Premium comprehensive corporate footer for logged out visitors
        <footer className="bg-[#f1f5f9] border-t border-slate-200 pt-16 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
              
              {/* Column 1: Contact Info / Address */}
              <div className="space-y-4">
                <h4 className="font-['Outfit'] font-bold text-base text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2">
                  Contact Info
                </h4>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-start gap-3">
                    <i className="fa fa-map-marker-alt text-[#d97706] mt-1 text-xs"></i>
                    <p className="leading-relaxed">123 Business Street, Tech City, TC 12345</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fa fa-phone-alt text-[#d97706] text-xs"></i>
                    <p>+91 (980) 123-4567</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fa fa-envelope text-[#d97706] text-xs"></i>
                    <p>info@techtender.com</p>
                  </div>
                </div>
              </div>

              {/* Column 2: Quick Links */}
              <div className="space-y-4">
                <h4 className="font-['Outfit'] font-bold text-base text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2">
                  Quick Links
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <Link to="/" className="text-slate-600 hover:text-[#d97706] transition-colors py-1 flex items-center gap-1.5">
                    <i className="fas fa-chevron-right text-[10px] text-[#d97706]/40"></i> Home
                  </Link>
                  <Link to="/about" className="text-slate-600 hover:text-[#d97706] transition-colors py-1 flex items-center gap-1.5">
                    <i className="fas fa-chevron-right text-[10px] text-[#d97706]/40"></i> About
                  </Link>
                  <Link to="/services" className="text-slate-600 hover:text-[#d97706] transition-colors py-1 flex items-center gap-1.5">
                    <i className="fas fa-chevron-right text-[10px] text-[#d97706]/40"></i> Services
                  </Link>
                  <Link to="/contact" className="text-slate-600 hover:text-[#d97706] transition-colors py-1 flex items-center gap-1.5">
                    <i className="fas fa-chevron-right text-[10px] text-[#d97706]/40"></i> Contact
                  </Link>
                </div>
              </div>

              {/* Column 3: Newsletter Integration */}
              <div className="space-y-4">
                <Newsletter />
              </div>

            </div>
          </div>

          {copyrightSection}
        </footer>
      )}

      {/* Premium Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-[1000] w-11 h-11 bg-[#d97706] hover:bg-[#b45309] text-white rounded-xl flex items-center justify-center shadow-lg shadow-[#d97706]/15 hover:shadow-[#d97706]/35 transition-all duration-300 transform active:scale-95 ${showScroll ? 'translate-y-0 opacity-100 visible' : 'translate-y-12 opacity-0 invisible'}`}
        aria-label="Back to top"
      >
        <i className="fa fa-arrow-up text-sm"></i>
      </button>
    </>
  );
}

export default Footer;
