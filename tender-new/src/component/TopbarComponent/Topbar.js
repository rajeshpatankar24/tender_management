function Topbar({ token }) {
  const showTopbar = !token;

  if (!showTopbar) return null;

  return (
    <div className="custom-topbar bg-[#f1f5f9] border-b border-slate-200 text-slate-600 text-xs flex items-center px-4 lg:px-8 hidden lg:flex justify-between">
      <div className="flex items-center gap-6">
        <span className="inline-flex items-center hover:text-slate-900 transition-colors duration-200">
          <i className="fas fa-envelope mr-2 text-[#d97706]"></i>
          info@techtender.com
        </span>
        <span className="inline-flex items-center hover:text-slate-900 transition-colors duration-200">
          <i className="fas fa-phone-alt mr-2 text-[#d97706]"></i>
          +91 (980) 123-4567
        </span>
      </div>
      <div className="flex items-center">
        <span className="inline-flex items-center hover:text-slate-900 transition-colors duration-200">
          <i className="fas fa-map-marker-alt mr-2 text-[#d97706]"></i>
          123 Business Street, Tech City, TC 12345
        </span>
      </div>
    </div>
  );
}

export default Topbar;
