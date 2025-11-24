import './Register.css';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { __urlapi } from '../../API_URL';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
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
  const [output, setOutput] = useState('');
  const [errors, setErrors] = useState({});
  const [isRegistering, setIsRegistering] = useState(false);

  // ---------------- VALIDATION ----------------
  const validate = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = 'Name is required';
    else if (!/^[A-Za-z ]+$/.test(name)) newErrors.name = 'Name must contain only letters';

    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Email is invalid';

    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (!mobile.trim()) newErrors.mobile = 'Mobile number is required';
    else if (!/^[6-9]\d{9}$/.test(mobile)) newErrors.mobile = 'Enter valid 10-digit mobile number';

    if (!address.trim()) newErrors.address = 'Address is required';
    
    // Check city based on input type
    if (useCityDropdown) {
      if (!city) newErrors.city = 'City is required';
    } else {
      if (!cityText.trim()) newErrors.city = 'City is required';
    }
    
    if (!gender) newErrors.gender = 'Gender is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = () => {
    const userDetails = {
      name,
      email,
      password,
      mobile,
      address,
      city: useCityDropdown ? (city?.value || '') : cityText,
      gender,
    };

    if (!validate()) {
      setOutput('');
      toast.warning('⚠️ Please fill all required fields correctly.', {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setIsRegistering(true); // Start loading

    axios
      .post(__urlapi + 'save', userDetails)
      .then(() => {
        setName('');
        setEmail('');
        setPassword('');
        setMobile('');
        setAddress('');
        setCity(null);
        setCityText('');
        setGender('');
        setOutput('');
        setErrors({});
        
        // Success toast
        toast.success('🎉 Registration successful! Please check your email to verify your account.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch((error) => {
        console.error(error);
        setOutput('');
        
        // Error toast
        toast.error('❌ Registration failed! Please try again or contact support.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .finally(() => {
        setIsRegistering(false); // Stop loading
      });
  };

  // ---------------- FETCH CITY DATA ----------------
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
        // If API fails, switch to text input
        setUseCityDropdown(false);
        setCitiesLoading(false);
      });
  }, []);

  return (
    <div className="register-section d-flex align-items-center justify-content-center py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="card shadow-lg border-0 rounded-4 p-4 p-md-5 bg-white">
              <h2 className="text-center mb-4 fw-bold text-primary">Create Your Account</h2>
              {output && (
                <div className={`alert ${output.includes('✅') ? 'alert-success' : 'alert-danger'}`}>
                  {output}
                </div>
              )}

              {/* NAME */}
              <div className="form-group mb-3">
                <label className="fw-semibold">Full Name</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter your full name"
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) {
                      setErrors({...errors, name: ''});
                    }
                  }}
                  value={name}
                />
                {errors.name && <small className="text-danger">{errors.name}</small>}
              </div>

              {/* EMAIL */}
              <div className="form-group mb-3">
                <label className="fw-semibold">Email Address</label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="example@gmail.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) {
                      setErrors({...errors, email: ''});
                    }
                  }}
                  value={email}
                />
                {errors.email && <small className="text-danger">{errors.email}</small>}
              </div>

              {/* PASSWORD */}
              <div className="form-group mb-3">
                <label className="fw-semibold">Password</label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) {
                      setErrors({...errors, password: ''});
                    }
                  }}
                  value={password}
                />
                {errors.password && <small className="text-danger">{errors.password}</small>}
              </div>

              {/* MOBILE */}
              <div className="form-group mb-3">
                <label className="fw-semibold">Mobile Number</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="10-digit mobile number"
                  onChange={(e) => {
                    setMobile(e.target.value);
                    if (errors.mobile) {
                      setErrors({...errors, mobile: ''});
                    }
                  }}
                  value={mobile}
                />
                {errors.mobile && <small className="text-danger">{errors.mobile}</small>}
              </div>

              {/* ADDRESS */}
              <div className="form-group mb-3">
                <label className="fw-semibold">Address</label>
                <textarea
                  rows="3"
                  className="form-control form-control-lg"
                  placeholder="Enter your full address"
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (errors.address) {
                      setErrors({...errors, address: ''});
                    }
                  }}
                  value={address}
                ></textarea>
                {errors.address && <small className="text-danger">{errors.address}</small>}
              </div>

              {/* CITY */}
              <div className="form-group mb-3">
                <label className="fw-semibold">City</label>
                {useCityDropdown ? (
                  <>
                    <Select
                      options={cityOptions}
                      value={city}
                      onChange={(value) => {
                        setCity(value);
                        if (errors.city) {
                          setErrors({...errors, city: ''});
                        }
                      }}
                      placeholder={citiesLoading ? "Loading cities..." : "Search or select city"}
                      isClearable
                      isLoading={citiesLoading}
                      isDisabled={citiesLoading}
                      styles={{
                        control: (base) => ({
                          ...base,
                          padding: '4px',
                          borderRadius: '8px',
                        }),
                      }}
                    />
                    <small className="text-muted d-block mt-1">
                      Can't find your city?{' '}
                      <button
                        type="button"
                        className="btn btn-link btn-sm p-0 text-primary"
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
                      className="form-control form-control-lg"
                      placeholder="Enter your city name"
                      onChange={(e) => {
                        setCityText(e.target.value);
                        if (errors.city) {
                          setErrors({...errors, city: ''});
                        }
                      }}
                      value={cityText}
                    />
                    <small className="text-muted d-block mt-1">
                      <button
                        type="button"
                        className="btn btn-link btn-sm p-0 text-primary"
                        onClick={() => setUseCityDropdown(true)}
                      >
                        Select from dropdown
                      </button>
                    </small>
                  </>
                )}
                {errors.city && <small className="text-danger d-block">{errors.city}</small>}
              </div>

              {/* GENDER */}
              <div className="form-group mb-4">
                <label className="fw-semibold d-block mb-2">Gender</label>
                <div className="d-flex gap-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      onChange={(e) => {
                        setGender(e.target.value);
                        if (errors.gender) {
                          setErrors({...errors, gender: ''});
                        }
                      }}
                      checked={gender === 'male'}
                    />
                    <label className="form-check-label" htmlFor="male" style={{cursor: 'pointer'}}>
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
                      onChange={(e) => {
                        setGender(e.target.value);
                        if (errors.gender) {
                          setErrors({...errors, gender: ''});
                        }
                      }}
                      checked={gender === 'female'}
                    />
                    <label className="form-check-label" htmlFor="female" style={{cursor: 'pointer'}}>
                      Female
                    </label>
                  </div>
                </div>
                {errors.gender && <small className="text-danger">{errors.gender}</small>}
              </div>

              {/* BUTTON */}
              <button
                type="button"
                className="btn btn-primary btn-lg w-100 shadow-sm"
                onClick={handleSubmit}
                disabled={isRegistering}
              >
                {isRegistering ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Registering...
                  </>
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
      
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default Register;
