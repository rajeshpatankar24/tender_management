import './Topbar.css';

function Topbar() {
  return (
    <div className="topbar">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12">
            <div className="topbar-left">
              <span className="topbar-item">
                <i className="fas fa-envelope me-2"></i>
                info@techtender.com
              </span>
              <span className="topbar-item">
                <i className="fas fa-phone-alt me-2"></i>
                +91 (980) 123-4567
              </span>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="topbar-right">
              <span className="topbar-item">
                <i className="fas fa-map-marker-alt me-2"></i>
                123 Business Street, Tech City, TC 12345
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
