import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Newsletter.css';
import { __newsletterapiurl } from '../../API_URL';

function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSignup = async () => {
    // Simple email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      toast.error('❌ Please enter a valid email');
      return;
    }

    try {
      const response = await axios.post(__newsletterapiurl, { email });
      toast.success(`✅ ${response.data.message}`);
      setEmail('');
    } catch (err) {
      if (err.response && err.response.data.message) {
        toast.error(`❌ ${err.response.data.message}`);
      } else {
        toast.error('❌ Signup failed. Try again later.');
      }
    }
  };

  return (
    <div className="newsletter-container">
      <h4 className="text-light mb-2">Newsletter</h4>
      <p className="text-light mb-3">Get updates for new tenders!</p>

      <div className="newsletter-form">
        <input
          type="text"
          className="form-control"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSignup}>
          Sign Up
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Newsletter;
