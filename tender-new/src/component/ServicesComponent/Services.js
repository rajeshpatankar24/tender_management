
import './Services.css';
import { Link } from 'react-router-dom';

function Services() {

  return (
    <>
   {/* Hero Section */}
   <div class="container-xxl py-5 bg-gradient-services">
      <div class="container">
        <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: '700px'}}>
          <h6 class="text-secondary text-uppercase mb-3">
            <i class="fa fa-cogs me-2"></i>Our Services
          </h6>
          <h1 class="mb-4 display-5 fw-bold">Comprehensive Tender Management Solutions</h1>
          <p class="fs-5 text-muted">
            From tender discovery to bid submission and contract management, we provide end-to-end solutions to help your business succeed in competitive bidding.
          </p>
        </div>
      </div>
    </div>

    {/* Main Services */}
    <div class="container-xxl py-5">
      <div class="container">
        <div class="row g-4">
          {/* Service 1 */}
          <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <div class="service-item h-100">
              <div class="service-icon">
                <i class="fa fa-search fa-3x"></i>
              </div>
              <h4 class="mb-3">Tender Discovery & Alerts</h4>
              <p class="mb-4">Access thousands of government and private sector tenders across multiple industries. Get real-time notifications for relevant opportunities matching your business profile.</p>
              <ul class="service-features">
                <li><i class="fa fa-check-circle me-2"></i>Advanced search filters</li>
                <li><i class="fa fa-check-circle me-2"></i>Custom email alerts</li>
                <li><i class="fa fa-check-circle me-2"></i>SMS notifications</li>
                <li><i class="fa fa-check-circle me-2"></i>Industry categorization</li>
              </ul>
            </div>
          </div>

          {/* Service 2 */}
          <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.2s">
            <div class="service-item h-100">
              <div class="service-icon">
                <i class="fa fa-file-alt fa-3x"></i>
              </div>
              <h4 class="mb-3">Bid Preparation & Submission</h4>
              <p class="mb-4">Streamline your bid preparation with our document management system, templates, and secure submission portal. Never miss a deadline again.</p>
              <ul class="service-features">
                <li><i class="fa fa-check-circle me-2"></i>Document templates</li>
                <li><i class="fa fa-check-circle me-2"></i>Version control</li>
                <li><i class="fa fa-check-circle me-2"></i>Secure file uploads</li>
                <li><i class="fa fa-check-circle me-2"></i>Deadline reminders</li>
              </ul>
            </div>
          </div>

          {/* Service 3 */}
          <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
            <div class="service-item h-100">
              <div class="service-icon">
                <i class="fa fa-chart-bar fa-3x"></i>
              </div>
              <h4 class="mb-3">Bid Analytics & Insights</h4>
              <p class="mb-4">Make data-driven decisions with comprehensive analytics on your bidding performance, win rates, and competitor analysis.</p>
              <ul class="service-features">
                <li><i class="fa fa-check-circle me-2"></i>Performance dashboards</li>
                <li><i class="fa fa-check-circle me-2"></i>Win/loss analysis</li>
                <li><i class="fa fa-check-circle me-2"></i>Competitor tracking</li>
                <li><i class="fa fa-check-circle me-2"></i>Custom reports</li>
              </ul>
            </div>
          </div>

          {/* Service 4 */}
          <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.4s">
            <div class="service-item h-100">
              <div class="service-icon">
                <i class="fa fa-users fa-3x"></i>
              </div>
              <h4 class="mb-3">Vendor Management</h4>
              <p class="mb-4">Manage your vendor profile, certifications, and compliance documents in one centralized location. Keep your credentials up-to-date and accessible.</p>
              <ul class="service-features">
                <li><i class="fa fa-check-circle me-2"></i>Profile management</li>
                <li><i class="fa fa-check-circle me-2"></i>Document storage</li>
                <li><i class="fa fa-check-circle me-2"></i>Certification tracking</li>
                <li><i class="fa fa-check-circle me-2"></i>Compliance alerts</li>
              </ul>
            </div>
          </div>

          {/* Service 5 */}
          <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
            <div class="service-item h-100">
              <div class="service-icon">
                <i class="fa fa-handshake fa-3x"></i>
              </div>
              <h4 class="mb-3">Contract Management</h4>
              <p class="mb-4">Track awarded contracts, manage deliverables, and monitor milestones. Ensure smooth execution from award to completion.</p>
              <ul class="service-features">
                <li><i class="fa fa-check-circle me-2"></i>Contract tracking</li>
                <li><i class="fa fa-check-circle me-2"></i>Milestone management</li>
                <li><i class="fa fa-check-circle me-2"></i>Payment tracking</li>
                <li><i class="fa fa-check-circle me-2"></i>Performance monitoring</li>
              </ul>
            </div>
          </div>

          {/* Service 6 */}
          <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.6s">
            <div class="service-item h-100">
              <div class="service-icon">
                <i class="fa fa-headset fa-3x"></i>
              </div>
              <h4 class="mb-3">Expert Support & Training</h4>
              <p class="mb-4">Get dedicated support from our tender experts. Access training resources, webinars, and one-on-one consultations to improve your success rate.</p>
              <ul class="service-features">
                <li><i class="fa fa-check-circle me-2"></i>24/7 support desk</li>
                <li><i class="fa fa-check-circle me-2"></i>Video tutorials</li>
                <li><i class="fa fa-check-circle me-2"></i>Live webinars</li>
                <li><i class="fa fa-check-circle me-2"></i>Expert consultation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Industry Coverage */}
    <div class="container-xxl py-5 bg-light">
      <div class="container">
        <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: '700px'}}>
          <h6 class="text-secondary text-uppercase mb-3">Industries We Serve</h6>
          <h2 class="mb-4 display-6 fw-bold">Comprehensive Industry Coverage</h2>
        </div>
        <div class="row g-4">
          <div class="col-lg-3 col-md-4 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
            <div class="industry-card text-center">
              <i class="fa fa-building fa-3x mb-3"></i>
              <h5>Construction</h5>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 col-sm-6 wow fadeInUp" data-wow-delay="0.2s">
            <div class="industry-card text-center">
              <i class="fa fa-laptop-code fa-3x mb-3"></i>
              <h5>IT & Software</h5>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
            <div class="industry-card text-center">
              <i class="fa fa-heartbeat fa-3x mb-3"></i>
              <h5>Healthcare</h5>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 col-sm-6 wow fadeInUp" data-wow-delay="0.4s">
            <div class="industry-card text-center">
              <i class="fa fa-graduation-cap fa-3x mb-3"></i>
              <h5>Education</h5>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
            <div class="industry-card text-center">
              <i class="fa fa-bolt fa-3x mb-3"></i>
              <h5>Energy</h5>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 col-sm-6 wow fadeInUp" data-wow-delay="0.6s">
            <div class="industry-card text-center">
              <i class="fa fa-truck fa-3x mb-3"></i>
              <h5>Transportation</h5>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
            <div class="industry-card text-center">
              <i class="fa fa-industry fa-3x mb-3"></i>
              <h5>Manufacturing</h5>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 col-sm-6 wow fadeInUp" data-wow-delay="0.8s">
            <div class="industry-card text-center">
              <i class="fa fa-shield-alt fa-3x mb-3"></i>
              <h5>Defense</h5>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* CTA Section */}
    <div class="container-xxl py-5">
      <div class="container">
        <div class="row g-5 align-items-center">
          <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
            <h2 class="mb-4 display-6 fw-bold">Ready to Transform Your Bidding Process?</h2>
            <p class="mb-4 fs-5">Join thousands of successful businesses using our platform to discover, bid, and win more tenders.</p>
            <ul class="list-unstyled">
              <li class="mb-3"><i class="fa fa-check-circle text-success fa-lg me-3"></i>Free 14-day trial - No credit card required</li>
              <li class="mb-3"><i class="fa fa-check-circle text-success fa-lg me-3"></i>Cancel anytime - No long-term contracts</li>
              <li class="mb-3"><i class="fa fa-check-circle text-success fa-lg me-3"></i>Full access to all features</li>
              <li class="mb-3"><i class="fa fa-check-circle text-success fa-lg me-3"></i>Dedicated onboarding support</li>
            </ul>
            <Link to="/register" class="btn btn-primary btn-lg px-5 py-3 me-3">
              <i class="fa fa-rocket me-2"></i>Start Free Trial
            </Link>
            <Link to="/contact" class="btn btn-outline-primary btn-lg px-5 py-3">
              <i class="fa fa-phone me-2"></i>Contact Sales
            </Link>
          </div>
          <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
            <div class="position-relative">
              <img src="/assets/img/slide-1.jpg" class="img-fluid rounded-3 shadow-lg" alt="Services" />
            </div>
          </div>
        </div>
      </div>
    </div>

       </>
   
  );
}

export default Services;
