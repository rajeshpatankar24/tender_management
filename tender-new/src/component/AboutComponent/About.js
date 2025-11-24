import './About.css';
import { Link } from 'react-router-dom';


function About() {


  return (
    <>
   {/* Hero Section */}
   <div class="container-xxl py-5 about-hero">
      <div class="container">
        <div class="row g-5 align-items-center">
          <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
            <h6 class="text-secondary text-uppercase mb-3">
              <i class="fa fa-info-circle me-2"></i>About Us
            </h6>
            <h1 class="mb-4 display-5 fw-bold">Leading Tender Management Platform Since 2010</h1>
            <p class="mb-4 fs-5">
              We are a technology-driven platform revolutionizing how businesses discover, manage, and win tenders. Our mission is to make the tendering process transparent, efficient, and accessible to all.
            </p>
            <div class="row g-3">
              <div class="col-sm-6">
                <div class="about-stat">
                  <h2 class="text-primary mb-0">15K+</h2>
                  <p class="mb-0">Tenders Posted</p>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="about-stat">
                  <h2 class="text-primary mb-0">5K+</h2>
                  <p class="mb-0">Active Vendors</p>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="about-stat">
                  <h2 class="text-primary mb-0">98%</h2>
                  <p class="mb-0">Client Satisfaction</p>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="about-stat">
                  <h2 class="text-primary mb-0">50+</h2>
                  <p class="mb-0">Countries</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
            <div class="position-relative">
              <img src="/assets/img/slide-1.jpg" class="img-fluid rounded-3 shadow-lg" alt="About Us" />
              <div class="about-badge">
                <i class="fa fa-award fa-3x text-white mb-2"></i>
                <h4 class="text-white mb-0">13+ Years</h4>
                <p class="text-white mb-0">of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Mission & Vision */}
    <div class="container-xxl py-5">
      <div class="container">
        <div class="row g-5">
          <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
            <div class="mission-card h-100">
              <div class="mission-icon">
                <i class="fa fa-bullseye fa-3x"></i>
              </div>
              <h3 class="mb-3">Our Mission</h3>
              <p class="mb-0">To democratize access to tender opportunities by providing a transparent, efficient, and user-friendly platform that connects businesses with government and private sector contracts worldwide.</p>
            </div>
          </div>
          <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.2s">
            <div class="mission-card h-100">
              <div class="mission-icon">
                <i class="fa fa-eye fa-3x"></i>
              </div>
              <h3 class="mb-3">Our Vision</h3>
              <p class="mb-0">To become the world's most trusted tender management platform, empowering businesses of all sizes to compete fairly and win contracts that drive growth and innovation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Core Values */}
    <div class="container-xxl py-5 bg-light">
      <div class="container">
        <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: '700px'}}>
          <h6 class="text-secondary text-uppercase mb-3">Our Values</h6>
          <h2 class="mb-4 display-6 fw-bold">What Drives Us</h2>
        </div>
        <div class="row g-4">
          <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <div class="value-card text-center h-100">
              <div class="value-icon">
                <i class="fa fa-shield-alt fa-2x"></i>
              </div>
              <h5 class="mb-3">Integrity</h5>
              <p class="mb-0">We maintain the highest ethical standards in all our operations and interactions.</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.2s">
            <div class="value-card text-center h-100">
              <div class="value-icon">
                <i class="fa fa-lightbulb fa-2x"></i>
              </div>
              <h5 class="mb-3">Innovation</h5>
              <p class="mb-0">We continuously evolve our platform with cutting-edge technology and features.</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
            <div class="value-card text-center h-100">
              <div class="value-icon">
                <i class="fa fa-users fa-2x"></i>
              </div>
              <h5 class="mb-3">Customer Focus</h5>
              <p class="mb-0">Our clients' success is our success. We're committed to their growth.</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.4s">
            <div class="value-card text-center h-100">
              <div class="value-icon">
                <i class="fa fa-check-circle fa-2x"></i>
              </div>
              <h5 class="mb-3">Excellence</h5>
              <p class="mb-0">We strive for excellence in every aspect of our service delivery.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Why Choose Us */}
    <div class="container-xxl py-5">
      <div class="container">
        <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: '700px'}}>
          <h6 class="text-secondary text-uppercase mb-3">Why Choose Us</h6>
          <h2 class="mb-4 display-6 fw-bold">What Makes Us Different</h2>
        </div>
        <div class="row g-4">
          <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <div class="feature-box">
              <div class="feature-number">01</div>
              <h4 class="mb-3">Comprehensive Database</h4>
              <p class="mb-0">Access to 15,000+ tenders from government and private sectors across 50+ countries.</p>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.2s">
            <div class="feature-box">
              <div class="feature-number">02</div>
              <h4 class="mb-3">Real-Time Updates</h4>
              <p class="mb-0">Instant notifications for new tenders, amendments, and deadline reminders.</p>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
            <div class="feature-box">
              <div class="feature-number">03</div>
              <h4 class="mb-3">Advanced Analytics</h4>
              <p class="mb-0">Data-driven insights to improve your bidding strategy and win rates.</p>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.4s">
            <div class="feature-box">
              <div class="feature-number">04</div>
              <h4 class="mb-3">Secure Platform</h4>
              <p class="mb-0">Bank-level security with SSL encryption and compliance with international standards.</p>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
            <div class="feature-box">
              <div class="feature-number">05</div>
              <h4 class="mb-3">Expert Support</h4>
              <p class="mb-0">24/7 dedicated support team to assist with all your tender-related queries.</p>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.6s">
            <div class="feature-box">
              <div class="feature-number">06</div>
              <h4 class="mb-3">User-Friendly Interface</h4>
              <p class="mb-0">Intuitive design that makes tender management simple and efficient.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Team Section */}
    <div class="container-xxl py-5 bg-light">
      <div class="container">
        <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: '700px'}}>
          <h6 class="text-secondary text-uppercase mb-3">Our Team</h6>
          <h2 class="mb-4 display-6 fw-bold">Meet Our Leadership</h2>
          <p>Experienced professionals dedicated to your success</p>
        </div>
        <div class="row g-4 justify-content-center">
          <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <div class="team-card text-center">
              <div class="team-avatar">
                <span class="fw-bold">SK</span>
              </div>
              <h5 class="mb-1">Suresh Kumar</h5>
              <p class="text-muted mb-3">CEO & Founder</p>
              <div class="team-social">
                <a href="#" class="btn btn-sm btn-outline-primary rounded-circle me-2">
                  <i class="fab fa-linkedin-in"></i>
                </a>
                <a href="#" class="btn btn-sm btn-outline-primary rounded-circle">
                  <i class="fab fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.2s">
            <div class="team-card text-center">
              <div class="team-avatar">
                <span class="fw-bold">PM</span>
              </div>
              <h5 class="mb-1">Priya Mehta</h5>
              <p class="text-muted mb-3">CTO</p>
              <div class="team-social">
                <a href="#" class="btn btn-sm btn-outline-primary rounded-circle me-2">
                  <i class="fab fa-linkedin-in"></i>
                </a>
                <a href="#" class="btn btn-sm btn-outline-primary rounded-circle">
                  <i class="fab fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
            <div class="team-card text-center">
              <div class="team-avatar">
                <span class="fw-bold">RV</span>
              </div>
              <h5 class="mb-1">Rahul Verma</h5>
              <p class="text-muted mb-3">Head of Operations</p>
              <div class="team-social">
                <a href="#" class="btn btn-sm btn-outline-primary rounded-circle me-2">
                  <i class="fab fa-linkedin-in"></i>
                </a>
                <a href="#" class="btn btn-sm btn-outline-primary rounded-circle">
                  <i class="fab fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.4s">
            <div class="team-card text-center">
              <div class="team-avatar">
                <span class="fw-bold">AS</span>
              </div>
              <h5 class="mb-1">Anita Singh</h5>
              <p class="text-muted mb-3">Head of Customer Success</p>
              <div class="team-social">
                <a href="#" class="btn btn-sm btn-outline-primary rounded-circle me-2">
                  <i class="fab fa-linkedin-in"></i>
                </a>
                <a href="#" class="btn btn-sm btn-outline-primary rounded-circle">
                  <i class="fab fa-twitter"></i>
                </a>
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
              <h2 class="text-white mb-3">Join Our Growing Community</h2>
              <p class="text-white mb-0 fs-5">Be part of thousands of successful businesses using our platform to discover and win tenders.</p>
            </div>
            <div class="col-lg-4 text-lg-end">
              <Link to="/register" class="btn btn-light btn-lg px-5 py-3">
                <i class="fa fa-user-plus me-2"></i>Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>

    </>
   
  );
}

export default About;
