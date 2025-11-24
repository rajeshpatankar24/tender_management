import './Login.css';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { __urlapi } from '../../API_URL';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [output, setOutput] = useState('');
  const [isSuccess, setIsSuccess] = useState(null);
  const [loading, setLoading] = useState(false); // Loader state
  const loginSectionRef = useRef();

  useEffect(() => {
    if (loginSectionRef.current) {
      loginSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleSubmit = async () => {
    if (!email || !password) {
      setOutput("Email and password are required to proceed.");
      setIsSuccess(false);
      return;
    }

    const userDetails = { email, password };
    setLoading(true); // Start loader

    try {
      const response = await axios.post(__urlapi + "login", userDetails);
      setEmail("");
      setPassword("");
      setOutput("Login successful!");
      setIsSuccess(true);
      const user = response.data.userdetails;
      
      toast.success(`🎉 Welcome back, ${user.name}!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", user.name);
      localStorage.setItem("email", user.email);
      localStorage.setItem("mobile", user.mobile);
      localStorage.setItem("address", user.address);
      localStorage.setItem("city", user.city);
      localStorage.setItem("gender", user.gender);
      localStorage.setItem("role", user.role);
      localStorage.setItem("info", user.info);

      navigate(user.role === "admin" ? "/admin" : "/user");
    } catch (error) {
      setIsSuccess(false);
      setOutput("Invalid email or incorrect password");
      
      toast.error('❌ Invalid email or password. Please try again.', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <>
      <div
        ref={loginSectionRef}
        className="login-page"
        style={{ paddingTop: '120px', paddingBottom: '40px' }} // Mobile-friendly spacing
      >
        <div className="login-card shadow-lg p-4 rounded-4">
          <h2 className="text-center fw-bold mb-4">
            Welcome Back 
          </h2>
          <p className="text-center text-muted mb-4">
            Please login to your account
          </p>

          {output && (
            <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`}>
              {output}
            </div>
          )}

          <form>
            <div className="form-group mb-3">
              <label htmlFor="email" className="fw-semibold">Email address</label>
              <input
                type="email"
                className="form-control"
                onChange={e => setEmail(e.target.value)}
                value={email}
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group mb-2">
              <label htmlFor="pwd" className="fw-semibold">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                onChange={e => setPassword(e.target.value)}
                value={password}
                placeholder="Enter your password"
              />
            </div>

            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label className="form-check-label" htmlFor="showPassword">
                Show Password
              </label>
            </div>

            <button
              type="button"
              className="btn btn-success w-100 fw-semibold py-2"
              onClick={handleSubmit}
              disabled={loading} // Disable while loading
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <div className="text-center mt-3">
              <small className="text-muted">
                Don’t have an account? <a href="/register" className="text-success fw-semibold">Register</a>
              </small>
            </div>
          </form>

          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default Login;
