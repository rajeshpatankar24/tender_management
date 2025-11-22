import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Contact.css';
import { __contactapiurl } from '../../API_URL';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await axios.post(__contactapiurl, formData);
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error('Failed to send message. Try again later.');
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="contact-hero py-5">
        <div className="container text-center">
          <h6 className="text-secondary text-uppercase mb-3">
            <i className="fa fa-envelope me-2"></i>Get In Touch
          </h6>
          <h1 className="display-5 fw-bold text-white mb-3">Contact Our Team</h1>
          <p className="fs-5 text-white mb-0">We're here to help you succeed. Reach out to us anytime!</p>
        </div>
      </div>

      {/* Contact Info & Form */}
      <div className="container my-5">
        <div className="row g-5">
          {/* Contact Information */}
          <div className="col-lg-4">
            <div className="contact-info-card mb-4">
              <div className="contact-icon">
                <i className="fa fa-map-marker-alt fa-2x"></i>
              </div>
              <h5 className="mb-2">Our Office</h5>
              <p className="mb-0">123 Business Street, Tech Park<br/>Indore, MP 452001, India</p>
            </div>

            <div className="contact-info-card mb-4">
              <div className="contact-icon">
                <i className="fa fa-phone fa-2x"></i>
              </div>
              <h5 className="mb-2">Call Us</h5>
              <p className="mb-0">
                <a href="tel:+919234567890">+91 92345 67890</a><br/>
                <a href="tel:+919876543210">+91 98765 43210</a>
              </p>
            </div>

            <div className="contact-info-card mb-4">
              <div className="contact-icon">
                <i className="fa fa-envelope fa-2x"></i>
              </div>
              <h5 className="mb-2">Email Us</h5>
              <p className="mb-0">
                <a href="mailto:support@techsol.com">support@techsol.com</a><br/>
                <a href="mailto:sales@techsol.com">sales@techsol.com</a>
              </p>
            </div>

            <div className="contact-info-card">
              <div className="contact-icon">
                <i className="fa fa-clock fa-2x"></i>
              </div>
              <h5 className="mb-2">Business Hours</h5>
              <p className="mb-0">
                Monday - Friday: 9:00 AM - 6:00 PM<br/>
                Saturday: 10:00 AM - 4:00 PM<br/>
                Sunday: Closed
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-8">
            <div className="contact-form-card">
              <h2 className="mb-4">Send Us a Message</h2>
              <p className="text-muted mb-4">Have a question or need assistance? Fill out the form below and our team will get back to you within 24 hours.</p>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Full Name*</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Email Address*</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-group">
                      <label>Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What is this regarding?"
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-group">
                      <label>Message*</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your inquiry..."
                        rows="6"
                        className="form-control"
                      ></textarea>
                    </div>
                  </div>

                  <div className="col-12">
                    <button type="submit" className="btn btn-primary btn-lg px-5">
                      <i className="fa fa-paper-plane me-2"></i>Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container-fluid py-5 bg-light">
        <div className="container">
          <div className="text-center mx-auto mb-5" style={{maxWidth: '700px'}}>
            <h6 className="text-secondary text-uppercase mb-3">FAQ</h6>
            <h2 className="display-6 fw-bold mb-3">Frequently Asked Questions</h2>
          </div>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="faq-item">
                <h5><i className="fa fa-question-circle text-primary me-2"></i>How do I register on the platform?</h5>
                <p>Click on the "Register" button in the navigation menu, fill out the registration form with your details, and verify your email address to get started.</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="faq-item">
                <h5><i className="fa fa-question-circle text-primary me-2"></i>Is there a free trial available?</h5>
                <p>Yes! We offer a 14-day free trial with full access to all features. No credit card required to start your trial.</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="faq-item">
                <h5><i className="fa fa-question-circle text-primary me-2"></i>How do I submit a bid?</h5>
                <p>Browse available tenders, select the one you're interested in, prepare your documents, and submit through our secure portal before the deadline.</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="faq-item">
                <h5><i className="fa fa-question-circle text-primary me-2"></i>What payment methods do you accept?</h5>
                <p>We accept all major credit cards, debit cards, net banking, UPI, and bank transfers for subscription payments.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default Contact;
