import './Register.css';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { __urlapi } from '../../API_URL';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkRateLimit, recordFailedAttempt, resetRateLimit, getPasswordStrength } from '../../utils/validationHelper';

function Register() {
  // Original state fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [cityOptions, setCityOptions] = useState([]);
  const [city, setCity] = useState(null);
  const [cityText, setCityText] = useState('');
  const [useCityDropdown, setUseCityDropdown] = useState(true);
  const [citiesLoading, setCitiesLoading] = useState(true);
  const [gender, setGender] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  // New fields requested
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [gstNumber, setGstNumber] = useState('');

  // Lockout / Error state
  const [errors, setErrors] = useState({});
  const [lockoutTime, setLockoutTime] = useState(0);

  // ---------------- RATE LIMIT COUNTDOWN ----------------
  useEffect(() => {
    const checkLimit = () => {
      const status = checkRateLimit('register_rate_limit');
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

  // ---------------- VALIDATION RULES ----------------
  const validateField = (fieldName, value) => {
    let errorMsg = '';

    switch (fieldName) {
      case 'name':
        if (!value.trim()) {
          errorMsg = 'Full name is required';
        } else if (value.length < 3 || value.length > 50) {
          errorMsg = 'Full name must be between 3 and 50 characters';
        } else if (!/^[a-zA-Z\s]{3,50}$/.test(value)) {
          errorMsg = 'Full name must contain only letters and spaces (no numbers or symbols)';
        }
        break;

      case 'email':
        if (!value.trim()) {
          errorMsg = 'Email address is required';
        // eslint-disable-next-line no-useless-escape
        } else if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(value)) {
          errorMsg = 'Please enter a valid email address';
        }
        break;

      case 'mobile':
        if (!value.trim()) {
          errorMsg = 'Mobile number is required';
        } else if (value.startsWith('+91') || value.includes(' ')) {
          errorMsg = 'Prefix +91 or spaces are not allowed. Enter only 10 digits';
        } else if (!/^[6-9]\d{9}$/.test(value)) {
          errorMsg = 'Must be exactly 10 digits and start with 6, 7, 8, or 9';
        }
        break;

      case 'password':
        if (!value) {
          errorMsg = 'Password is required';
        } else if (value.length < 8 || value.length > 32) {
          errorMsg = 'Password must be between 8 and 32 characters';
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/.test(value)) {
          errorMsg = 'Password must have: 1 uppercase, 1 lowercase, 1 number, and 1 special character';
        }
        break;

      case 'confirmPassword':
        if (!value) {
          errorMsg = 'Please confirm your password';
        } else if (value !== password) {
          errorMsg = 'Passwords do not match';
        }
        break;

      case 'role':
        if (!value) {
          errorMsg = 'Please select a role';
        } else if (!['admin', 'company', 'vendor'].includes(value)) {
          errorMsg = 'Invalid role selected';
        }
        break;

      case 'companyName':
        if ((role === 'company' || role === 'vendor') && !value.trim()) {
          errorMsg = 'Company name is required';
        } else if ((role === 'company' || role === 'vendor') && (value.length < 2 || value.length > 100)) {
          errorMsg = 'Company name must be between 2 and 100 characters';
        // eslint-disable-next-line no-useless-escape
        } else if ((role === 'company' || role === 'vendor') && !/^[a-zA-Z0-9\s\.\,\&\-]{2,100}$/.test(value)) {
          errorMsg = 'Company name contains invalid characters';
        }
        break;

      case 'gstNumber':
        if (role === 'company') {
          if (!value.trim()) {
            errorMsg = 'GST number is required for company role';
          } else if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(value)) {
            errorMsg = 'Please enter a valid 15-character Indian GST format (e.g. 22AAAAA0000A1Z5)';
          }
        }
        break;

      case 'address':
        if (!value.trim()) {
          errorMsg = 'Address is required';
        }
        break;

      case 'city':
        if (useCityDropdown) {
          if (!city) errorMsg = 'City is required';
        } else {
          if (!cityText.trim()) errorMsg = 'City name is required';
        }
        break;

      case 'gender':
        if (!gender) {
          errorMsg = 'Gender is required';
        }
        break;

      default:
        break;
    }

    return errorMsg;
  };

  // ---------------- CHANGE & BLUR HANDLERS ----------------
  const handleFieldChange = (fieldName, value) => {
    // Clear the error for this field as the user types
    setErrors(prev => ({ ...prev, [fieldName]: '' }));

    switch (fieldName) {
      case 'name': setName(value); break;
      case 'email': setEmail(value); break;
      case 'password':
        setPassword(value);
        if (confirmPassword) {
          // Re-validate confirm password on password changes
          setErrors(prev => ({
            ...prev,
            confirmPassword: value === confirmPassword ? '' : 'Passwords do not match'
          }));
        }
        break;
      case 'confirmPassword': setConfirmPassword(value); break;
      case 'mobile': setMobile(value); break;
      case 'role':
        setRole(value);
        setErrors(prev => ({ ...prev, role: '', companyName: '', gstNumber: '' }));
        break;
      case 'companyName': setCompanyName(value); break;
      case 'gstNumber': setGstNumber(value.toUpperCase()); break; // GST is uppercase
      case 'address': setAddress(value); break;
      case 'cityText': setCityText(value); break;
      case 'gender': setGender(value); break;
      default: break;
    }
  };

  const handleBlur = (fieldName, value) => {
    let finalVal = value;
    if (fieldName === 'email') {
      finalVal = value.toLowerCase().trim();
      setEmail(finalVal);
    }
    const errorMsg = validateField(fieldName, finalVal);
    setErrors(prev => ({ ...prev, [fieldName]: errorMsg }));
  };

  // Validate all fields on final submit click
  const validateAllFields = () => {
    const newErrors = {};
    const fieldsToValidate = [
      { name: 'name', value: name },
      { name: 'email', value: email },
      { name: 'mobile', value: mobile },
      { name: 'password', value: password },
      { name: 'confirmPassword', value: confirmPassword },
      { name: 'role', value: role },
      { name: 'address', value: address },
      { name: 'city', value: useCityDropdown ? city : cityText },
      { name: 'gender', value: gender }
    ];

    if (role === 'company' || role === 'vendor') {
      fieldsToValidate.push({ name: 'companyName', value: companyName });
    }
    if (role === 'company') {
      fieldsToValidate.push({ name: 'gstNumber', value: gstNumber });
    }

    fieldsToValidate.forEach(field => {
      const msg = validateField(field.name, field.value);
      if (msg) {
        newErrors[field.name] = msg;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------------- SUBMIT ACTION ----------------
  const handleSubmit = () => {
    if (lockoutTime > 0) {
      toast.error(`⚠️ Form is locked due to too many server failures. Try again in ${lockoutTime}s.`, {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    const isValid = validateAllFields();
    if (!isValid) {
      toast.warning('⚠️ Please correct the errors in the form before submitting.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    setIsRegistering(true);

    const userDetails = {
      name,
      email: email.toLowerCase().trim(),
      password,
      mobile,
      address,
      city: useCityDropdown ? (city?.value || '') : cityText,
      gender,
      role,
      companyName: ['company', 'vendor'].includes(role) ? companyName : '',
      gstNumber: role === 'company' ? gstNumber : ''
    };

    axios
      .post(__urlapi + 'save', userDetails)
      .then(() => {
        // Reset state
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setMobile('');
        setAddress('');
        setCity(null);
        setCityText('');
        setGender('');
        setRole('');
        setCompanyName('');
        setGstNumber('');
        setErrors({});

        // Clear attempts on success
        resetRateLimit('register_rate_limit');

        toast.success('🎉 Registration successful! Please check your email to verify your account.', {
          position: 'top-right',
          autoClose: 5000,
        });
      })
      .catch((error) => {
        console.error(error);
        const serverMsg = error.response?.data?.message || 'Registration failed! Please check your inputs or try again.';
        const limit = recordFailedAttempt('register_rate_limit', 3, 30);
        if (limit.isLocked) {
          setLockoutTime(30);
          toast.error('❌ Too many failed attempts. Registration form locked for 30 seconds.', {
            position: 'top-right',
            autoClose: 5000,
          });
        } else {
          toast.error(`❌ ${serverMsg}`, {
            position: 'top-right',
            autoClose: 4000,
          });
        }
      })
      .finally(() => {
        setIsRegistering(false);
      });
  };

  // ---------------- FETCH CITIES ----------------
  useEffect(() => {
    setCitiesLoading(true);
    axios
      .post('https://countriesnow.space/api/v0.1/countries/cities', {
        country: 'India',
      })
      .then((res) => {
        const formattedCities = res.data.data.map((city) => ({
          value: city,
          label: city,
        }));
        setCityOptions(formattedCities);
        setCitiesLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching cities:', err);
        setUseCityDropdown(false);
        setCitiesLoading(false);
      });
  }, []);

  // Password strength visual indicator helpers
  const { strength, score } = getPasswordStrength(password);
  const strengthColors = {
    Weak: 'bg-danger',
    Medium: 'bg-warning',
    Strong: 'bg-success'
  };

  return (
    <div className="register-section d-flex align-items-center justify-content-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="card shadow-lg border-0 p-4 p-md-5">
              <h2 className="text-center mb-4 fw-bold">Create Your Account</h2>
              
              {lockoutTime > 0 && (
                <div className="alert alert-danger text-center mb-4">
                  🔒 Registration locked out. Too many failed attempts. Try again in <strong>{lockoutTime}s</strong>.
                </div>
              )}

              {/* ROLE (dropdown) */}
              <div className="form-group mb-3">
                <label className="fw-semibold">Select Role <span className="text-danger">*</span></label>
                <select
                  className={`form-control form-control-lg ${errors.role ? 'is-invalid border-danger' : ''}`}
                  value={role}
                  onChange={(e) => handleFieldChange('role', e.target.value)}
                  onBlur={(e) => handleBlur('role', e.target.value)}
                >
                  <option value="">-- Choose your Role --</option>
                  <option value="admin">Administrator</option>
                  <option value="company">Company</option>
                  <option value="vendor">Vendor</option>
                </select>
                {errors.role && <small className="text-danger mt-1">{errors.role}</small>}
              </div>

              {/* NAME */}
              <div className="form-group mb-3">
                <label className="fw-semibold">Full Name <span className="text-danger">*</span></label>
                <input
                  type="text"
                  className={`form-control form-control-lg ${errors.name ? 'is-invalid border-danger' : ''}`}
                  placeholder="Enter your full name"
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  onBlur={(e) => handleBlur('name', e.target.value)}
                  value={name}
                />
                {errors.name && <small className="text-danger mt-1">{errors.name}</small>}
              </div>

              {/* EMAIL */}
              <div className="form-group mb-3">
                <label className="fw-semibold">Email Address <span className="text-danger">*</span></label>
                <input
                  type="email"
                  className={`form-control form-control-lg ${errors.email ? 'is-invalid border-danger' : ''}`}
                  placeholder="example@gmail.com"
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  onBlur={(e) => handleBlur('email', e.target.value)}
                  value={email}
                />
                {errors.email && <small className="text-danger mt-1">{errors.email}</small>}
              </div>

              {/* MOBILE */}
              <div className="form-group mb-3">
                <label className="fw-semibold">Mobile Number (Indian) <span className="text-danger">*</span></label>
                <input
                  type="text"
                  className={`form-control form-control-lg ${errors.mobile ? 'is-invalid border-danger' : ''}`}
                  placeholder="10-digit mobile number"
                  onChange={(e) => handleFieldChange('mobile', e.target.value)}
                  onBlur={(e) => handleBlur('mobile', e.target.value)}
                  value={mobile}
                />
                <span className="text-muted d-block mt-1" style={{ fontSize: '11px' }}>
                  💡 Hint: Enter 10-digit mobile number (e.g. 9876543210) without prefix or spaces.
                </span>
                {errors.mobile && <small className="text-danger mt-1">{errors.mobile}</small>}
              </div>

              {/* PASSWORD */}
              <div className="form-group mb-3">
                <label className="fw-semibold">Password <span className="text-danger">*</span></label>
                <input
                  type="password"
                  className={`form-control form-control-lg ${errors.password ? 'is-invalid border-danger' : ''}`}
                  placeholder="Enter secure password"
                  onChange={(e) => handleFieldChange('password', e.target.value)}
                  onBlur={(e) => handleBlur('password', e.target.value)}
                  value={password}
                />
                
                {/* Live Password Strength Meter */}
                {password && (
                  <div className="mt-2">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <small className="fw-semibold" style={{ fontSize: '12px' }}>
                        Strength: <span className={`text-${strength === 'Strong' ? 'success' : strength === 'Medium' ? 'warning' : 'danger'}`}>{strength}</span>
                      </small>
                    </div>
                    <div className="progress" style={{ height: '6px', borderRadius: '4px', backgroundColor: '#e2e8f0' }}>
                      <div
                        className={`progress-bar ${strengthColors[strength]} transition-all`}
                        role="progressbar"
                        style={{ width: `${(score / 4) * 100}%`, transition: 'width 0.3s ease' }}
                        aria-valuenow={score}
                        aria-valuemin="0"
                        aria-valuemax="4"
                      ></div>
                    </div>
                    <small className="text-muted d-block mt-1" style={{ fontSize: '11px', lineHeight: '1.2' }}>
                      Requirements: Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char.
                    </small>
                  </div>
                )}
                {errors.password && <small className="text-danger mt-1">{errors.password}</small>}
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="form-group mb-3">
                <label className="fw-semibold">Confirm Password <span className="text-danger">*</span></label>
                <input
                  type="password"
                  className={`form-control form-control-lg ${errors.confirmPassword ? 'is-invalid border-danger' : ''}`}
                  placeholder="Re-enter password"
                  onChange={(e) => handleFieldChange('confirmPassword', e.target.value)}
                  onBlur={(e) => handleBlur('confirmPassword', e.target.value)}
                  value={confirmPassword}
                />
                {errors.confirmPassword && <small className="text-danger mt-1">{errors.confirmPassword}</small>}
              </div>

              {/* CONDITIONAL COMPANY NAME */}
              {['company', 'vendor'].includes(role) && (
                <div className="form-group mb-3">
                  <label className="fw-semibold">Company Name <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className={`form-control form-control-lg ${errors.companyName ? 'is-invalid border-danger' : ''}`}
                    placeholder="Enter registered company name"
                    onChange={(e) => handleFieldChange('companyName', e.target.value)}
                    onBlur={(e) => handleBlur('companyName', e.target.value)}
                    value={companyName}
                  />
                  {errors.companyName && <small className="text-danger mt-1">{errors.companyName}</small>}
                </div>
              )}

              {/* CONDITIONAL GST NUMBER */}
              {role === 'company' && (
                <div className="form-group mb-3">
                  <label className="fw-semibold">GST Number <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className={`form-control form-control-lg ${errors.gstNumber ? 'is-invalid border-danger' : ''}`}
                    placeholder="e.g. 22AAAAA0000A1Z5"
                    onChange={(e) => handleFieldChange('gstNumber', e.target.value)}
                    onBlur={(e) => handleBlur('gstNumber', e.target.value)}
                    value={gstNumber}
                  />
                  {errors.gstNumber && <small className="text-danger mt-1">{errors.gstNumber}</small>}
                </div>
              )}

              {/* ADDRESS */}
              <div className="form-group mb-3">
                <label className="fw-semibold">Address <span className="text-danger">*</span></label>
                <textarea
                  rows="2"
                  className={`form-control form-control-lg ${errors.address ? 'is-invalid border-danger' : ''}`}
                  placeholder="Enter full physical address"
                  onChange={(e) => handleFieldChange('address', e.target.value)}
                  onBlur={(e) => handleBlur('address', e.target.value)}
                  value={address}
                ></textarea>
                {errors.address && <small className="text-danger mt-1">{errors.address}</small>}
              </div>

              {/* CITY */}
              <div className="form-group mb-3">
                <label className="fw-semibold">City <span className="text-danger">*</span></label>
                {useCityDropdown ? (
                  <>
                    <Select
                      options={cityOptions}
                      value={city}
                      onChange={(value) => {
                        setCity(value);
                        setErrors(prev => ({ ...prev, city: '' }));
                      }}
                      placeholder={citiesLoading ? 'Loading cities...' : 'Search or select city'}
                      isClearable
                      isLoading={citiesLoading}
                      isDisabled={citiesLoading}
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          background: '#ffffff !important',
                          borderColor: state.isFocused ? 'var(--primary-color) !important' : 'var(--border-glass) !important',
                          borderRadius: '8px !important',
                          padding: '2px',
                          boxShadow: state.isFocused ? '0 0 0 4px var(--primary-glow) !important' : 'none !important',
                          transition: 'var(--transition) !important',
                        }),
                        singleValue: (base) => ({
                          ...base,
                          color: 'var(--text-primary) !important',
                        }),
                        placeholder: (base) => ({
                          ...base,
                          color: 'var(--text-muted) !important',
                        }),
                        menu: (base) => ({
                          ...base,
                          background: '#ffffff !important',
                          border: '1px solid var(--border-glass) !important',
                          borderRadius: '8px !important',
                          zIndex: 9999,
                        }),
                        option: (base, state) => ({
                          ...base,
                          background: state.isSelected 
                            ? 'var(--primary-color) !important' 
                            : state.isFocused 
                              ? 'rgba(217, 119, 6, 0.08) !important' 
                              : 'transparent !important',
                          color: state.isSelected ? '#ffffff !important' : 'var(--text-primary) !important',
                          cursor: 'pointer',
                        }),
                        input: (base) => ({
                          ...base,
                          color: 'var(--text-primary) !important',
                        }),
                      }}
                    />
                    <small className="text-muted d-block mt-1">
                      Can't find your city?{' '}
                      <button
                        type="button"
                        className="btn btn-link btn-sm p-0 text-primary fw-semibold"
                        onClick={() => setUseCityDropdown(false)}
                      >
                        Type manually
                      </button>
                    </small>
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      className={`form-control form-control-lg ${errors.city ? 'is-invalid border-danger' : ''}`}
                      placeholder="Enter your city name"
                      onChange={(e) => handleFieldChange('cityText', e.target.value)}
                      onBlur={(e) => handleBlur('city', e.target.value)}
                      value={cityText}
                    />
                    <small className="text-muted d-block mt-1">
                      <button
                        type="button"
                        className="btn btn-link btn-sm p-0 text-primary fw-semibold"
                        onClick={() => setUseCityDropdown(true)}
                      >
                        Select from dropdown
                      </button>
                    </small>
                  </>
                )}
                {errors.city && <small className="text-danger d-block mt-1">{errors.city}</small>}
              </div>

              {/* GENDER */}
              <div className="form-group mb-4">
                <label className="fw-semibold d-block mb-2">Gender <span className="text-danger">*</span></label>
                <div className="d-flex gap-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      onChange={(e) => handleFieldChange('gender', e.target.value)}
                      checked={gender === 'male'}
                    />
                    <label className="form-check-label" htmlFor="male" style={{ cursor: 'pointer' }}>
                      Male
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      onChange={(e) => handleFieldChange('gender', e.target.value)}
                      checked={gender === 'female'}
                    />
                    <label className="form-check-label" htmlFor="female" style={{ cursor: 'pointer' }}>
                      Female
                    </label>
                  </div>
                </div>
                {errors.gender && <small className="text-danger d-block mt-1">{errors.gender}</small>}
              </div>

              {/* BUTTON */}
              <button
                type="button"
                className="btn btn-primary btn-lg w-100 shadow-sm"
                onClick={handleSubmit}
                disabled={isRegistering || lockoutTime > 0}
              >
                {isRegistering ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Registering...
                  </>
                ) : lockoutTime > 0 ? (
                  `Locked for ${lockoutTime}s`
                ) : (
                  'Register Now'
                )}
              </button>

              {/* Redirect Link */}
              <p className="text-center mt-3 mb-0">
                Already have an account?{' '}
                <a href="/login" className="text-decoration-none text-primary fw-semibold">
                  Login here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
