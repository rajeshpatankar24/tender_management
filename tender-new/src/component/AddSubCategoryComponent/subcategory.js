import './subcategory.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { __categoryapiurl, __subcategoryapiurl } from '../../API_URL';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkRateLimit, recordFailedAttempt, resetRateLimit } from '../../utils/validationHelper';

function Addsubcategory() {
  // Original states
  const [file, setFile] = useState(null);
  const [catName, setCatName] = useState('');
  const [subCatName, setSubCatName] = useState('');
  const [output, setOutput] = useState('');
  const [cDetails, setCatDetails] = useState([]);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // New fields requested
  const [subcategoryCode, setSubcategoryCode] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true); // Status toggle, default active

  // Validation & Lockout states
  const [errors, setErrors] = useState({});
  const [lockoutTime, setLockoutTime] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  // ---------------- FETCH CATEGORIES ----------------
  useEffect(() => {
    var condition_obj = {};
    axios.get(__categoryapiurl + "fetch", {
      params: { condition_obj: condition_obj }
    }).then((response) => {
      setCatDetails(response.data);
    }).catch((error) => {
      console.error('Error fetching categories:', error);
    });
  }, []);

  // ---------------- RATE LIMIT COUNTDOWN ----------------
  useEffect(() => {
    const checkLimit = () => {
      const status = checkRateLimit('subcategory_rate_limit');
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

  const handleChange = (event) => {
    setFile(event.target.files[0]);
    setErrors(prev => ({ ...prev, file: '' }));
  };

  // ---------------- UNIQUENESS CHECK ----------------
  const checkSubcategoryUniqueness = async (catNameVal, subCatNameVal) => {
    if (!catNameVal || !subCatNameVal.trim()) return;

    try {
      const response = await axios.get(__subcategoryapiurl + "fetch", {
        params: { catnm: catNameVal, subcatnm: subCatNameVal.trim() }
      });
      // If matches exist in this category, it's a duplicate
      if (response.data && response.data.length > 0) {
        setErrors(prev => ({
          ...prev,
          subCatName: 'Subcategory name must be unique within the selected parent category.'
        }));
        return false;
      }
    } catch (error) {
      // 404/400 error implies no matching resource found -> unique!
      console.log('Uniqueness check: unique name confirmed', error);
    }
    return true;
  };

  // ---------------- VALIDATION RULES ----------------
  const validateField = (fieldName, value) => {
    let errorMsg = '';
    switch (fieldName) {
      case 'catName':
        if (!value || value === 'Select Category') {
          errorMsg = 'Please select a valid Parent Category';
        }
        break;

      case 'subCatName':
        if (!value || !value.trim()) {
          errorMsg = 'Subcategory Name is required';
        } else if (value.trim().length < 3 || value.trim().length > 60) {
          errorMsg = 'Subcategory Name must be between 3 and 60 characters';
        // eslint-disable-next-line no-useless-escape
        } else if (!/^[a-zA-Z\s\&\-]{3,60}$/.test(value)) {
          errorMsg = 'Name must only contain letters, spaces, ampersands (&), or dashes (-). No numbers allowed';
        }
        break;

      case 'subcategoryCode':
        if (value && !/^[A-Z]{2,8}$/.test(value)) {
          errorMsg = 'Subcategory Code must be between 2 and 8 uppercase letters';
        }
        break;

      case 'description':
        if (value && value.length > 200) {
          errorMsg = 'Description cannot exceed 200 characters';
        }
        break;

      case 'file':
        if (!value) {
          errorMsg = 'Subcategory Icon file is required';
        }
        break;

      default:
        break;
    }
    return errorMsg;
  };

  // ---------------- CHANGE & BLUR HANDLERS ----------------
  const handleFieldChange = (fieldName, value) => {
    setErrors(prev => ({ ...prev, [fieldName]: '' }));
    if (fieldName === 'subcategoryCode') {
      setSubcategoryCode(value.toUpperCase()); // Auto uppercase
    } else if (fieldName === 'description') {
      setDescription(value);
    } else if (fieldName === 'subCatName') {
      setSubCatName(value);
    }
  };

  const handleBlur = async (fieldName, value) => {
    const errorMsg = validateField(fieldName, value);
    setErrors(prev => ({ ...prev, [fieldName]: errorMsg }));

    if (fieldName === 'subCatName' && !errorMsg && catName) {
      await checkSubcategoryUniqueness(catName, value);
    }
  };

  const validateAllFields = () => {
    const newErrors = {
      catName: validateField('catName', catName),
      subCatName: validateField('subCatName', subCatName),
      subcategoryCode: validateField('subcategoryCode', subcategoryCode),
      description: validateField('description', description),
      file: validateField('file', file)
    };
    setErrors(newErrors);
    
    let isValid = true;
    Object.keys(newErrors).forEach(key => {
      if (newErrors[key]) isValid = false;
    });

    return isValid;
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (lockoutTime > 0) {
      toast.error(`⚠️ Form is locked. Try again in ${lockoutTime}s.`, {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    const isValid = validateAllFields();
    if (!isValid) {
      toast.warning('⚠️ Please resolve the validation errors before submitting.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    // Double-check uniqueness on submit
    const isUnique = await checkSubcategoryUniqueness(catName, subCatName);
    if (!isUnique) {
      toast.error('❌ Subcategory name already exists in this parent category.', {
        position: 'top-right',
        autoClose: 4000,
      });
      return;
    }

    setIsSaving(true);

    var formData = new FormData();
    formData.append('catnm', catName);
    formData.append('subcatnm', subCatName.trim());
    formData.append('caticon', file);
    
    // Additional parameters required by user specs
    formData.append('subcategoryCode', subcategoryCode);
    formData.append('description', description.trim());
    formData.append('status', isActive ? 'active' : 'inactive');

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };

    axios.post(__subcategoryapiurl + "save", formData, config)
      .then((response) => {
        toast.success("🎉 Subcategory added successfully!", {
          position: 'top-right',
          autoClose: 4000,
        });

        setCatName("");
        setSubCatName("");
        setFile(null);
        setSubcategoryCode("");
        setDescription("");
        setIsActive(true);
        setErrors({});
        setLoginSuccess(true);
        setOutput("Successfully added");

        // Reset file input in DOM
        const fileInput = document.getElementById('subcaticonFile');
        if (fileInput) fileInput.value = '';

        resetRateLimit('subcategory_rate_limit');
      })
      .catch((error) => {
        console.error(error);
        const limit = recordFailedAttempt('subcategory_rate_limit', 3, 30);
        if (limit.isLocked) {
          setLockoutTime(30);
          toast.error('❌ Too many failed attempts. Subcategory form locked for 30 seconds.', {
            position: 'top-right',
            autoClose: 5000,
          });
        } else {
          toast.error("❌ Sub Category addition failed! Name may already exist.", {
            position: 'top-right',
            autoClose: 4000,
          });
          setOutput("Sub Category name is already exists....");
        }
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  useEffect(() => {
    if (loginSuccess) {
      setTimeout(() => {
        setLoginSuccess(false);
      }, 3000);
    }
  }, [loginSuccess]);

  return (
    <>
      <div className="container-xxl py-5">
        <div className="container glass-panel p-4 shadow-lg bg-white rounded-4" style={{ maxWidth: '700px' }}>
          <div className="row g-5 justify-content-center">
            <div className="col-lg-12 wow fadeInUp" data-wow-delay="0.1s">
              
              {/* Custom Toast Message */}
              {loginSuccess && (
                <div className="alert alert-success text-center fw-bold">
                  {output}
                </div>
              )}

              <h3 className="text-success text-uppercase fw-bold border-bottom pb-2 mb-3">Add Sub Category</h3>
              
              {lockoutTime > 0 && (
                <div className="alert alert-danger text-center fw-semibold mb-4">
                  🔒 Subcategory form locked. Try again in {lockoutTime}s
                </div>
              )}

              <form onSubmit={handleSubmit}>
                
                {/* PARENT CATEGORY SELECT */}
                <div className="form-group mb-3">
                  <label htmlFor="catnm" className="fw-semibold mb-1">Parent Category <span className="text-danger">*</span></label>
                  <select 
                    className={`form-control ${errors.catName ? 'is-invalid border-danger' : ''}`} 
                    value={catName} 
                    onChange={e => {
                      setCatName(e.target.value);
                      setErrors(prev => ({ ...prev, catName: '' }));
                      if (subCatName) {
                        checkSubcategoryUniqueness(e.target.value, subCatName);
                      }
                    }}
                    onBlur={e => handleBlur('catName', e.target.value)}
                    disabled={lockoutTime > 0}
                  >
                    <option value="">-- Select Category --</option>
                    {
                      cDetails.map((row, idx) => (
                        <option key={idx} value={row.catnm}>{row.catnm}</option>
                      ))
                    }
                  </select>
                  {errors.catName && <small className="text-danger d-block mt-1">{errors.catName}</small>}
                </div>

                {/* SUBCATEGORY NAME */}
                <div className="form-group mb-3">
                  <label htmlFor="subcatnm" className="fw-semibold mb-1">Sub Category Name <span className="text-danger">*</span></label>
                  <input 
                    type="text" 
                    className={`form-control ${errors.subCatName ? 'is-invalid border-danger' : ''}`} 
                    value={subCatName} 
                    placeholder="Enter subcategory name (e.g. Laptops)"
                    onChange={e => handleFieldChange('subCatName', e.target.value)} 
                    onBlur={e => handleBlur('subCatName', e.target.value)}
                    disabled={lockoutTime > 0}
                  />
                  {errors.subCatName && <small className="text-danger d-block mt-1">{errors.subCatName}</small>}
                </div>

                {/* SUBCATEGORY CODE */}
                <div className="form-group mb-3">
                  <label htmlFor="subcatcode" className="fw-semibold mb-1">Subcategory Code (Optional)</label>
                  <input 
                    type="text" 
                    className={`form-control ${errors.subcategoryCode ? 'is-invalid border-danger' : ''}`} 
                    value={subcategoryCode} 
                    placeholder="e.g. LAPTOP"
                    onChange={e => handleFieldChange('subcategoryCode', e.target.value)} 
                    onBlur={e => handleBlur('subcategoryCode', e.target.value)}
                    disabled={lockoutTime > 0}
                  />
                  <small className="text-muted d-block mt-1">
                    Enforced uppercase. 2-8 alphabetic characters only.
                  </small>
                  {errors.subcategoryCode && <small className="text-danger d-block mt-1">{errors.subcategoryCode}</small>}
                </div>

                {/* DESCRIPTION */}
                <div className="form-group mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label htmlFor="description" className="fw-semibold">Description (Optional)</label>
                    <span className={`fw-semibold text-${description.length > 200 ? 'danger' : 'success'}`} style={{ fontSize: '12px' }}>
                      {description.length} / 200
                    </span>
                  </div>
                  <textarea 
                    rows="3"
                    className={`form-control ${errors.description ? 'is-invalid border-danger' : ''}`} 
                    value={description} 
                    placeholder="Enter short subcategory description..."
                    onChange={e => handleFieldChange('description', e.target.value)} 
                    onBlur={e => handleBlur('description', e.target.value)}
                    disabled={lockoutTime > 0}
                  />
                  {errors.description && <small className="text-danger d-block mt-1">{errors.description}</small>}
                </div>

                {/* STATUS TOGGLE */}
                <div className="form-group mb-3 d-flex align-items-center justify-content-between p-2 border rounded bg-light">
                  <div>
                    <span className="fw-semibold d-block">Status Toggle</span>
                    <small className="text-muted">Set whether this subcategory is active or inactive</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className={`fw-bold me-2 text-${isActive ? 'success' : 'secondary'}`}>
                      {isActive ? 'Active' : 'Inactive'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsActive(!isActive)}
                      className={`position-relative d-inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isActive ? 'bg-success' : 'bg-secondary'}`}
                      style={{ width: '48px', height: '24px', borderRadius: '12px', border: 'none', position: 'relative', outline: 'none' }}
                      disabled={lockoutTime > 0}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          backgroundColor: '#ffffff',
                          display: 'block',
                          position: 'absolute',
                          top: '3px',
                          left: isActive ? '27px' : '3px',
                          transition: 'left 0.2s ease'
                        }}
                      />
                    </button>
                  </div>
                </div>

                {/* SUBCATEGORY ICON FILE */}
                <div className="form-group mb-4">
                  <label htmlFor="subcaticonFile" className="fw-semibold mb-1">Subcategory Icon <span className="text-danger">*</span></label>
                  <input 
                    id="subcaticonFile"
                    type="file" 
                    className={`form-control ${errors.file ? 'is-invalid border-danger' : ''}`} 
                    onChange={handleChange} 
                    disabled={lockoutTime > 0}
                  />
                  {errors.file && <small className="text-danger d-block mt-1">{errors.file}</small>}
                </div>

                {/* BUTTON */}
                <button 
                  onClick={handleSubmit} 
                  type="submit" 
                  className="btn btn-danger btn-lg w-100 shadow"
                  disabled={isSaving || lockoutTime > 0}
                >
                  {isSaving ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Saving Subcategory...
                    </>
                  ) : lockoutTime > 0 ? (
                    `Locked for {lockoutTime}s`
                  ) : (
                    'Add Sub Category'
                  )}
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Addsubcategory;
