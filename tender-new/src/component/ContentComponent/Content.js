import './Content.css';
import {Link} from 'react-router-dom';


function Content() {
  return (
    <>
    {/* Hero Section */}
    <div class="container-xxl py-5">
        <div class="container">
            <div class="row g-5 align-items-center">
                <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                    <h6 class="text-secondary text-uppercase mb-3">
                        <i class="fa fa-award me-2"></i>Trusted Tender Platform
                    </h6>
                    <h1 class="mb-4 display-5 fw-bold">Streamline Your Tender Management Process</h1>
                    <p class="mb-4 fs-5">
                        Connect with thousands of government and private sector tenders. Our platform simplifies the entire bidding process, from discovery to submission, helping you win more contracts.
                    </p>
                    <div class="row g-3 mb-4">
                        <div class="col-sm-6">
                            <div class="d-flex align-items-center">
                                <div class="flex-shrink-0 btn-square bg-primary rounded-circle me-3">
                                    <i class="fa fa-check text-white"></i>
                                </div>
                                <span class="fw-medium">10,000+ Active Tenders</span>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="d-flex align-items-center">
                                <div class="flex-shrink-0 btn-square bg-primary rounded-circle me-3">
                                    <i class="fa fa-check text-white"></i>
                                </div>
                                <span class="fw-medium">Real-Time Notifications</span>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="d-flex align-items-center">
                                <div class="flex-shrink-0 btn-square bg-primary rounded-circle me-3">
                                    <i class="fa fa-check text-white"></i>
                                </div>
                                <span class="fw-medium">Secure Document Management</span>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="d-flex align-items-center">
                                <div class="flex-shrink-0 btn-square bg-primary rounded-circle me-3">
                                    <i class="fa fa-check text-white"></i>
                                </div>
                                <span class="fw-medium">Expert Bid Support</span>
                            </div>
                        </div>
                    </div>
                    <Link to="/register" class="btn btn-primary btn-lg px-5 py-3 me-3">
                        <i class="fa fa-user-plus me-2"></i>Get Started Free
                    </Link>
                    <Link to="/viewcategory" class="btn btn-outline-primary btn-lg px-5 py-3">
                        <i class="fa fa-search me-2"></i>Browse Tenders
                    </Link>
                </div>
                <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
                    <div class="position-relative overflow-hidden rounded-3 shadow-lg">
                        <img src="/assets/img/slide-1.jpg" class="img-fluid rounded-3" alt="Tender Management" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* Stats Section */}
    <div class="container-xxl py-5 bg-light">
        <div class="container">
            <div class="row g-4 text-center">
                <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div class="bg-white rounded-3 p-4 shadow-sm h-100">
                        <i class="fa fa-file-alt fa-3x text-primary mb-3"></i>
                        <h2 class="mb-2 fw-bold text-primary">15,000+</h2>
                        <p class="mb-0 text-muted">Total Tenders Posted</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.2s">
                    <div class="bg-white rounded-3 p-4 shadow-sm h-100">
                        <i class="fa fa-users fa-3x text-primary mb-3"></i>
                        <h2 class="mb-2 fw-bold text-primary">5,000+</h2>
                        <p class="mb-0 text-muted">Registered Vendors</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                    <div class="bg-white rounded-3 p-4 shadow-sm h-100">
                        <i class="fa fa-handshake fa-3x text-primary mb-3"></i>
                        <h2 class="mb-2 fw-bold text-primary">8,500+</h2>
                        <p class="mb-0 text-muted">Successful Bids</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.4s">
                    <div class="bg-white rounded-3 p-4 shadow-sm h-100">
                        <i class="fa fa-globe fa-3x text-primary mb-3"></i>
                        <h2 class="mb-2 fw-bold text-primary">50+</h2>
                        <p class="mb-0 text-muted">Countries Covered</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* Features Section */}
    <div class="container-xxl py-5">
        <div class="container">
            <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: '600px'}}>
                <h6 class="text-secondary text-uppercase mb-3">Why Choose Us</h6>
                <h2 class="mb-4 display-6 fw-bold">Complete Tender Management Solution</h2>
            </div>
            <div class="row g-4">
                <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div class="card border-0 shadow-sm h-100 feature-card">
                        <div class="card-body p-4">
                            <div class="feature-icon bg-primary bg-gradient rounded-circle mb-4">
                                <i class="fa fa-search fa-2x text-white"></i>
                            </div>
                            <h4 class="mb-3">Smart Tender Discovery</h4>
                            <p class="text-muted mb-0">Advanced search filters and AI-powered recommendations help you find relevant tenders matching your business profile and capabilities.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.2s">
                    <div class="card border-0 shadow-sm h-100 feature-card">
                        <div class="card-body p-4">
                            <div class="feature-icon bg-primary bg-gradient rounded-circle mb-4">
                                <i class="fa fa-bell fa-2x text-white"></i>
                            </div>
                            <h4 class="mb-3">Real-Time Alerts</h4>
                            <p class="text-muted mb-0">Never miss a deadline with instant notifications for new tenders, amendments, and important updates via email and SMS.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                    <div class="card border-0 shadow-sm h-100 feature-card">
                        <div class="card-body p-4">
                            <div class="feature-icon bg-primary bg-gradient rounded-circle mb-4">
                                <i class="fa fa-file-upload fa-2x text-white"></i>
                            </div>
                            <h4 class="mb-3">Easy Bid Submission</h4>
                            <p class="text-muted mb-0">Streamlined submission process with document templates, version control, and secure encrypted file uploads.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.4s">
                    <div class="card border-0 shadow-sm h-100 feature-card">
                        <div class="card-body p-4">
                            <div class="feature-icon bg-primary bg-gradient rounded-circle mb-4">
                                <i class="fa fa-chart-line fa-2x text-white"></i>
                            </div>
                            <h4 class="mb-3">Bid Analytics</h4>
                            <p class="text-muted mb-0">Track your bid performance, win rates, and competitor analysis with comprehensive reporting and insights.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                    <div class="card border-0 shadow-sm h-100 feature-card">
                        <div class="card-body p-4">
                            <div class="feature-icon bg-primary bg-gradient rounded-circle mb-4">
                                <i class="fa fa-shield-alt fa-2x text-white"></i>
                            </div>
                            <h4 class="mb-3">Secure & Compliant</h4>
                            <p class="text-muted mb-0">Bank-level security with SSL encryption, compliance with government regulations, and audit trails for all activities.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.6s">
                    <div class="card border-0 shadow-sm h-100 feature-card">
                        <div class="card-body p-4">
                            <div class="feature-icon bg-primary bg-gradient rounded-circle mb-4">
                                <i class="fa fa-headset fa-2x text-white"></i>
                            </div>
                            <h4 class="mb-3">24/7 Support</h4>
                            <p class="text-muted mb-0">Dedicated support team available round the clock to assist with technical issues, bid queries, and platform guidance.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* Testimonials Section */}
    <div class="container-xxl py-5 bg-light">
        <div class="container">
            <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: '600px'}}>
                <h6 class="text-secondary text-uppercase mb-3">Testimonials</h6>
                <h2 class="mb-4 display-6 fw-bold">What Our Clients Say</h2>
            </div>
            <div class="row g-4">
                <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div class="card border-0 shadow-sm h-100 testimonial-card">
                        <div class="card-body p-4">
                            <div class="d-flex align-items-center mb-3">
                                <div class="testimonial-avatar bg-primary text-white rounded-circle me-3">
                                    <span class="fw-bold">RS</span>
                                </div>
                                <div>
                                    <h5 class="mb-0">Rajesh Sharma</h5>
                                    <small class="text-muted">CEO, BuildTech Solutions</small>
                                </div>
                            </div>
                            <div class="mb-3">
                                <i class="fa fa-star text-primary"></i>
                                <i class="fa fa-star text-primary"></i>
                                <i class="fa fa-star text-primary"></i>
                                <i class="fa fa-star text-primary"></i>
                                <i class="fa fa-star text-primary"></i>
                            </div>
                            <p class="text-muted mb-0">"This platform has transformed how we manage tenders. We've increased our bid success rate by 40% and saved countless hours on administrative work."</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.2s">
                    <div class="card border-0 shadow-sm h-100 testimonial-card">
                        <div class="card-body p-4">
                            <div class="d-flex align-items-center mb-3">
                                <div class="testimonial-avatar bg-primary text-white rounded-circle me-3">
                                    <span class="fw-bold">PK</span>
                                </div>
                                <div>
                                    <h5 class="mb-0">Priya Kapoor</h5>
                                    <small class="text-muted">Director, GreenEnergy Corp</small>
                                </div>
                            </div>
                            <div class="mb-3">
                                <i class="fa fa-star text-primary"></i>
                                <i class="fa fa-star text-primary"></i>
                                <i class="fa fa-star text-primary"></i>
                                <i class="fa fa-star text-primary"></i>
                                <i class="fa fa-star text-primary"></i>
                            </div>
                            <p class="text-muted mb-0">"The real-time alerts and smart search features are game-changers. We never miss relevant opportunities and the support team is incredibly responsive."</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                    <div class="card border-0 shadow-sm h-100 testimonial-card">
                        <div class="card-body p-4">
                            <div class="d-flex align-items-center mb-3">
                                <div class="testimonial-avatar bg-primary text-white rounded-circle me-3">
                                    <span class="fw-bold">AM</span>
                                </div>
                                <div>
                                    <h5 class="mb-0">Amit Mehta</h5>
                                    <small class="text-muted">Procurement Head, TechVision Ltd</small>
                                </div>
                            </div>
                            <div class="mb-3">
                                <i class="fa fa-star text-primary"></i>
                                <i class="fa fa-star text-primary"></i>
                                <i class="fa fa-star text-primary"></i>
                                <i class="fa fa-star text-primary"></i>
                                <i class="fa fa-star text-primary"></i>
                            </div>
                            <p class="text-muted mb-0">"Excellent platform with comprehensive features. The analytics dashboard helps us make data-driven decisions and improve our bidding strategy."</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* CTA Section */}
    <div class="container-xxl py-5">
        <div class="container">
            <div class="bg-primary rounded-3 p-5 wow fadeInUp" data-wow-delay="0.1s">
                <div class="row g-4 align-items-center">
                    <div class="col-lg-8">
                        <h2 class="text-white mb-3">Ready to Win More Tenders?</h2>
                        <p class="text-white mb-0 fs-5">Join thousands of successful businesses using our platform. Start your free trial today - no credit card required.</p>
                    </div>
                    <div class="col-lg-4 text-lg-end">
                        <Link to="/register" class="btn btn-light btn-lg px-5 py-3">
                            <i class="fa fa-rocket me-2"></i>Start Free Trial
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* content End */}


    </>
   
  );
}

export default Content;
