import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    <div className="w-full text-left">
      <h4 className="font-['Outfit'] font-bold text-lg text-slate-800 mb-2">
        <i className="fas fa-paper-plane text-[#d97706] mr-2"></i>
        Newsletter
      </h4>
      <p className="text-sm text-slate-600 mb-4 leading-relaxed">
        Stay updated with real-time bidding alerts and new tender opportunities!
      </p>

      <div className="flex flex-col sm:flex-row gap-2 items-stretch">
        <input
          type="email"
          className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-850 placeholder-slate-400 focus:outline-none focus:border-[#d97706]/60 focus:ring-1 focus:ring-[#d97706]/60 transition-all duration-200"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button 
          className="bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-sm px-6 py-3 rounded-xl transition-all duration-200 shadow-md shadow-[#d97706]/10 whitespace-nowrap active:scale-[0.98]" 
          onClick={handleSignup}
        >
          Subscribe
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </div>
  );
}

export default Newsletter;
