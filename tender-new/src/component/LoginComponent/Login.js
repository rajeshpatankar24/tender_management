import './Login.css';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { __urlapi } from '../../API_URL';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkRateLimit, recordFailedAttempt, resetRateLimit } from '../../utils/validationHelper';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loader state
  const loginSectionRef = useRef();

  // Custom errors and rate limiting state
  const [errors, setErrors] = useState({});
  const [lockoutTime, setLockoutTime] = useState(0);

  useEffect(() => {
    if (loginSectionRef.current) {
      loginSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // ---------------- RATE LIMIT COUNTDOWN ----------------
  useEffect(() => {
    const checkLimit = () => {
      const status = checkRateLimit('login_rate_limit');
      if (status.isLocked) {
        setLockoutTime(status.secondsRemaining);
      } else {
        setLockoutTime(0);
      }
    };
    checkLimit();
    const interval = setInterval(checkLimit, 1000);
    return () => clearInterval(interval);
  }, []);

  // ---------------- VALIDATION LOGIC ----------------
  const validateField = (fieldName, value) => {
    let errorMsg = '';
    if (fieldName === 'email') {
      if (!value.trim()) {
        errorMsg = 'Email address is required';
      // eslint-disable-next-line no-useless-escape
      } else if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(value)) {
        errorMsg = 'Please enter a valid email address';
      }
    } else if (fieldName === 'password') {
      if (!value) {
        errorMsg = 'Password is required';
      }
    }
    return errorMsg;
  };

  const handleFieldChange = (fieldName, value) => {
    // Clear errors as user types
    setErrors(prev => ({ ...prev, [fieldName]: '' }));
    if (fieldName === 'email') {
      setEmail(value);
    } else if (fieldName === 'password') {
      setPassword(value);
    }
  };

  const handleBlur = (fieldName, value) => {
    let finalVal = value;
    if (fieldName === 'email') {
      finalVal = value.trim(); // Trim whitespace on blur
      setEmail(finalVal);
    }
    const errorMsg = validateField(fieldName, finalVal);
    setErrors(prev => ({ ...prev, [fieldName]: errorMsg }));
  };

  const validateAllFields = () => {
    const newErrors = {
      email: validateField('email', email),
      password: validateField('password', password)
    };
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  // ---------------- SUBMIT LOGIC ----------------
  const handleSubmit = async () => {
    if (lockoutTime > 0) {
      toast.error(`🔒 Login is locked. Try again in ${lockoutTime}s`, {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    const isValid = validateAllFields();
    if (!isValid) {
      toast.warning('⚠️ Please enter correct credentials.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    const userDetails = { email: email.trim(), password };
    setLoading(true);

    try {
      const response = await axios.post(__urlapi + 'login', userDetails);
      
      // Successful Login -> reset everything
      setEmail('');
      setPassword('');
      setErrors({});
      resetRateLimit('login_rate_limit');

      const user = response.data.userdetails || {};
      const userRole = user.role || 'user';
      const userName = user.name || 'User';

      toast.success(`🎉 Welcome back, ${userName}!`, {
        position: 'top-right',
        autoClose: 3000,
      });

      localStorage.setItem('token', response.data.token || '');
      localStorage.setItem('name', userName);
      localStorage.setItem('email', user.email || '');
      localStorage.setItem('mobile', user.mobile || '');
      localStorage.setItem('address', user.address || '');
      localStorage.setItem('city', user.city || '');
      localStorage.setItem('gender', user.gender || '');
      localStorage.setItem('role', userRole);
      localStorage.setItem('info', user.info || '');

      navigate(userRole === 'admin' ? '/admin' : '/user');
    } catch (error) {
      console.error(error);
      
      const serverMsg = error.response?.data?.message || 'Invalid email or password';
      // Increment and record failed attempts on invalid credentials
      const limit = recordFailedAttempt('login_rate_limit', 5, 60);
      if (limit.isLocked) {
        setLockoutTime(60);
        toast.error('❌ Too many failed attempts. Form locked for 60 seconds.', {
          position: 'top-right',
          autoClose: 5000,
        });
      } else {
        toast.error(`❌ ${serverMsg}. Attempt ${limit.attempts}/5.`, {
          position: 'top-right',
          autoClose: 4000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        ref={loginSectionRef}
        className="login-page"
        style={{ paddingTop: '120px', paddingBottom: '40px' }}
      >
        <div className="login-card shadow-lg p-4 rounded-4">
          <h2 className="text-center fw-bold mb-2">Welcome Back</h2>
          <p className="text-center text-muted mb-4">Please login to your account</p>

          {lockoutTime > 0 && (
            <div className="alert alert-danger text-center fw-semibold mb-3">
              🔒 Too many attempts. Try again in {lockoutTime}s
            </div>
          )}

          <form onSubmit={(e) => e.preventDefault()}>
            {/* EMAIL */}
            <div className="form-group mb-3">
              <label htmlFor="email" className="fw-semibold">Email address <span className="text-danger">*</span></label>
              <input
                id="email"
                type="email"
                className={`form-control ${errors.email ? 'is-invalid border-danger' : ''}`}
                onChange={e => handleFieldChange('email', e.target.value)}
                onBlur={e => handleBlur('email', e.target.value)}
                value={email}
                placeholder="Enter your email"
                disabled={lockoutTime > 0}
              />
              {errors.email && <small className="text-danger d-block mt-1">{errors.email}</small>}
            </div>

            {/* PASSWORD */}
            <div className="form-group mb-3">
              <label htmlFor="pwd" className="fw-semibold">Password <span className="text-danger">*</span></label>
              <div className="position-relative">
                <input
                  id="pwd"
                  type={showPassword ? 'text' : 'password'}
                  className={`form-control pe-5 ${errors.password ? 'is-invalid border-danger' : ''}`}
                  onChange={e => handleFieldChange('password', e.target.value)}
                  onBlur={e => handleBlur('password', e.target.value)}
                  value={password}
                  placeholder="Enter your password"
                  disabled={lockoutTime > 0}
                />
                
                {/* SVG eye toggle button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="btn position-absolute top-50 translate-middle-y border-0 bg-transparent p-0"
                  style={{ right: '15px', color: '#64748b', cursor: 'pointer', zIndex: 10 }}
                  tabIndex="-1"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <small className="text-danger d-block mt-1">{errors.password}</small>}
            </div>

            {/* BUTTON */}
            <button
              type="button"
              className="btn btn-success w-100 fw-semibold py-2 mt-2"
              onClick={handleSubmit}
              disabled={loading || lockoutTime > 0}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Logging in...
                </>
              ) : lockoutTime > 0 ? (
                `Locked for ${lockoutTime}s`
              ) : (
                'Login'
              )}
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
