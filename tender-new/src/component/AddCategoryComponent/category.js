import './category.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { __categoryapiurl } from '../../API_URL';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkRateLimit, recordFailedAttempt, resetRateLimit, capitalizeWords } from '../../utils/validationHelper';

function Category() {
  // Original states
  const [catName, setCatName] = useState('');
  const [file, setfile] = useState(null);
  const [output, setoutput] = useState('');

  // New fields requested
  const [categoryCode, setCategoryCode] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true); // Status toggle, default true

  // Validation & Lockout states
  const [errors, setErrors] = useState({});
  const [lockoutTime, setLockoutTime] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  // ---------------- RATE LIMIT COUNTDOWN ----------------
  useEffect(() => {
    const checkLimit = () => {
      const status = checkRateLimit('category_rate_limit');
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

  const handleChange = (e) => {
    setfile(e.target.files[0]);
    setErrors(prev => ({ ...prev, file: '' }));
  };

  // ---------------- VALIDATION RULES ----------------
  const validateField = (fieldName, value) => {
    let errorMsg = '';
    switch (fieldName) {
      case 'catName':
        if (!value || !value.trim()) {
          errorMsg = 'Category Name is required';
        } else if (value.trim().length < 3 || value.trim().length > 60) {
          errorMsg = 'Category Name must be between 3 and 60 characters';
        // eslint-disable-next-line no-useless-escape
        } else if (!/^[a-zA-Z\s\&\-]{3,60}$/.test(value)) {
          errorMsg = 'Name must only contain letters, spaces, ampersands (&), or dashes (-). No numbers allowed';
        }
        break;

      case 'categoryCode':
        if (value && !/^[A-Z]{2,6}$/.test(value)) {
          errorMsg = 'Category Code must be between 2 and 6 uppercase letters';
        }
        break;

      case 'description':
        if (value && value.length > 200) {
          errorMsg = 'Description cannot exceed 200 characters';
        }
        break;

      case 'file':
        if (!value) {
          errorMsg = 'Category Icon file is required';
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
    if (fieldName === 'categoryCode') {
      setCategoryCode(value.toUpperCase()); // Auto uppercase on input
    } else if (fieldName === 'description') {
      setDescription(value);
    } else if (fieldName === 'catName') {
      setCatName(value);
    }
  };

  const handleBlur = (fieldName, value) => {
    let finalVal = value;
    if (fieldName === 'catName') {
      finalVal = capitalizeWords(value); // Trim on blur, capitalize first letter of each word auto
      setCatName(finalVal);
    }
    const errorMsg = validateField(fieldName, finalVal);
    setErrors(prev => ({ ...prev, [fieldName]: errorMsg }));
  };

  const validateAllFields = () => {
    const newErrors = {
      catName: validateField('catName', catName),
      categoryCode: validateField('categoryCode', categoryCode),
      description: validateField('description', description),
      file: validateField('file', file)
    };
    setErrors(newErrors);
    return !newErrors.catName && !newErrors.categoryCode && !newErrors.description && !newErrors.file;
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = (e) => {
    e.preventDefault();

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

    setIsSaving(true);

    const formData = new FormData();
    formData.append('catnm', catName.trim());
    formData.append('caticon', file);
    
    // Additional parameters required by user specs
    formData.append('categoryCode', categoryCode);
    formData.append('description', description.trim());
    formData.append('status', isActive ? 'active' : 'inactive');

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };

    axios.post(__categoryapiurl + "save", formData, config)
      .then(() => {
        toast.success("🎉 Category added successfully!", {
          position: 'top-right',
          autoClose: 4000,
        });

        setCatName("");
        setfile(null);
        setCategoryCode("");
        setDescription("");
        setIsActive(true);
        setErrors({});
        setoutput("Successfully added");

        // Reset file input in DOM
        const fileInput = document.getElementById('caticonFile');
        if (fileInput) fileInput.value = '';

        resetRateLimit('category_rate_limit');
      })
      .catch((error) => {
        console.error(error);
        const limit = recordFailedAttempt('category_rate_limit', 3, 30);
        if (limit.isLocked) {
          setLockoutTime(30);
          toast.error('❌ Too many failed attempts. Category form locked for 30 seconds.', {
            position: 'top-right',
            autoClose: 5000,
          });
        } else {
          toast.error("❌ Category addition failed! Category name may already exist.", {
            position: 'top-right',
            autoClose: 4000,
          });
          setoutput("failed");
        }
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  return (
    <>
      <div className="container-xxl py-5">
        <div className="container glass-panel p-4 shadow-lg bg-white rounded-4" style={{ maxWidth: '700px' }}>
          <div className="row g-5 justify-content-center">
            <div className="col-lg-12 wow fadeInUp" data-wow-delay="0.1s">
              <h3 className="text-success text-uppercase fw-bold border-bottom pb-2 mb-3">Add Category</h3>
              
              {lockoutTime > 0 && (
                <div className="alert alert-danger text-center fw-semibold mb-4">
                  🔒 Category form locked. Try again in {lockoutTime}s
                </div>
              )}

              {output && <font style={{ "color": "blue", "fontWeight": "bold" }} className="d-block mb-3">{output}</font>}
              
              <form onSubmit={handleSubmit}>
                
                {/* CATEGORY NAME */}
                <div className="form-group mb-3">
                  <label htmlFor="catnm" className="fw-semibold mb-1">Category Name <span className="text-danger">*</span></label>
                  <input 
                    type="text" 
                    className={`form-control ${errors.catName ? 'is-invalid border-danger' : ''}`} 
                    value={catName} 
                    placeholder="Enter category name (e.g. Technology)"
                    onChange={e => handleFieldChange('catName', e.target.value)} 
                    onBlur={e => handleBlur('catName', e.target.value)}
                    disabled={lockoutTime > 0}
                  />
                  {errors.catName && <small className="text-danger d-block mt-1">{errors.catName}</small>}
                </div>

                {/* CATEGORY CODE */}
                <div className="form-group mb-3">
                  <label htmlFor="categoryCode" className="fw-semibold mb-1">Category Code (Optional)</label>
                  <input 
                    type="text" 
                    className={`form-control ${errors.categoryCode ? 'is-invalid border-danger' : ''}`} 
                    value={categoryCode} 
                    placeholder="e.g. TECH"
                    onChange={e => handleFieldChange('categoryCode', e.target.value)} 
                    onBlur={e => handleBlur('categoryCode', e.target.value)}
                    disabled={lockoutTime > 0}
                  />
                  <small className="text-muted d-block mt-1">
                    Enforced uppercase. 2-6 alphabetic characters only.
                  </small>
                  {errors.categoryCode && <small className="text-danger d-block mt-1">{errors.categoryCode}</small>}
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
                    placeholder="Enter short category description..."
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
                    <small className="text-muted">Set whether this category is active or inactive</small>
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

                {/* CATEGORY ICON FILE */}
                <div className="form-group mb-4">
                  <label htmlFor="caticonFile" className="fw-semibold mb-1">Category Icon <span className="text-danger">*</span></label>
                  <input 
                    id="caticonFile"
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
                      Saving Category...
                    </>
                  ) : lockoutTime > 0 ? (
                    `Locked for ${lockoutTime}s`
                  ) : (
                    'Add Category'
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

export default Category;
