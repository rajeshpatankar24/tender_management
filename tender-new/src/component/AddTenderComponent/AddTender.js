import { __categoryapiurl, __productapiurl, __subcategoryapiurl } from '../../API_URL';
import './AddTender.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkRateLimit, recordFailedAttempt, resetRateLimit, sanitizeHTML } from '../../utils/validationHelper';

// Static Indian States list
const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi'
];

function AddTender() {
  // Original states
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [catnm, setCatName] = useState('');
  const [subcatnm, setSubCatName] = useState('');
  const [descp, setDescp] = useState('');
  const [baseprice, setPrice] = useState('');
  const [cDetails, setCatDetails] = useState([]);
  const [scDetails, setScDetails] = useState([]);
  const [output, setOutput] = useState('');

  // New fields requested
  const [tenderNumber, setTenderNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [documents, setDocuments] = useState([]); // Up to 3 docs
  const [status, setStatus] = useState('draft');
  const [location, setLocation] = useState('');

  // Validation & Lockout states
  const [errors, setErrors] = useState({});
  const [lockoutTime, setLockoutTime] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ---------------- FETCH CATEGORIES ----------------
  useEffect(() => {
    axios.get(__categoryapiurl + "fetch").then((response) => {
      setCatDetails(response.data);
    }).catch((error) => {
      console.error('Error fetching categories:', error);
    });
  }, []);

  // ---------------- RATE LIMIT COUNTDOWN ----------------
  useEffect(() => {
    const checkLimit = () => {
      const limitStatus = checkRateLimit('tender_rate_limit');
      if (limitStatus.isLocked) {
        setLockoutTime(limitStatus.secondsRemaining);
      } else {
        setLockoutTime(0);
      }
    };
    checkLimit();
    const interval = setInterval(checkLimit, 1000);
    return () => clearInterval(interval);
  }, []);

  // ---------------- CATEGORY CHANGE & SUB-FETCH ----------------
  const fetchSubCat = (selectedCategory) => {
    setCatName(selectedCategory);
    setSubCatName(''); // Reset subcategory selection
    setScDetails([]);

    // Clear error
    setErrors(prev => ({ ...prev, catnm: '', subcatnm: '' }));

    if (!selectedCategory || selectedCategory === 'Select Category:') {
      return;
    }

    axios.get(__subcategoryapiurl + "fetch?catnm=" + encodeURIComponent(selectedCategory)).then((response) => {
      setScDetails(response.data);
    }).catch((error) => {
      console.log('Error fetching subcategories:', error);
      setScDetails([]);
    });
  };

  // ---------------- FILE HANDLERS ----------------
  const handleTenderIconChange = (event) => {
    setFile(event.target.files[0]);
    setErrors(prev => ({ ...prev, file: '' }));
  };

  const handleDocumentChange = (e) => {
    const files = Array.from(e.target.files);
    let docErrors = [];

    if (files.length > 3) {
      setErrors(prev => ({ ...prev, documents: 'You can upload a maximum of 3 documents only.' }));
      setDocuments([]);
      e.target.value = null; // Clear input
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      if (!/\.(pdf|doc|docx)$/i.test(f.name)) {
        docErrors.push(`"${f.name}" has an invalid type. Only PDF, DOC, DOCX are allowed`);
      }
      if (f.size > 5 * 1024 * 1024) {
        docErrors.push(`"${f.name}" exceeds the 5MB size limit`);
      }
    }

    if (docErrors.length > 0) {
      setErrors(prev => ({ ...prev, documents: docErrors.join('. ') }));
      setDocuments([]);
      e.target.value = null; // Clear input
    } else {
      setErrors(prev => ({ ...prev, documents: '' }));
      setDocuments(files);
    }
  };

  // ---------------- FIELD VALIDATION ----------------
  const validateField = (fieldName, value) => {
    let errorMsg = '';

    switch (fieldName) {
      case 'title':
        if (!value || !value.trim()) {
          errorMsg = 'Tender Title is required';
        } else if (value.trim().length < 10 || value.trim().length > 150) {
          errorMsg = 'Title must be between 10 and 150 characters';
        // eslint-disable-next-line no-useless-escape
        } else if (!/^[a-zA-Z0-9\s\-\,\.\/\(\)]{10,150}$/.test(value)) {
          errorMsg = 'Title contains invalid characters. Letters, numbers, spaces, and - , . / ( ) only';
        }
        break;

      case 'tenderNumber':
        if (!value || !value.trim()) {
          errorMsg = 'Tender Reference ID is required';
        // eslint-disable-next-line no-useless-escape
        } else if (!/^[A-Z0-9\-\/]{5,30}$/.test(value)) {
          errorMsg = 'Must be 5-30 chars, uppercase letters, digits, dashes or slashes only (e.g. TND-2024-001)';
        }
        break;

      case 'description':
        if (!value || !value.trim()) {
          errorMsg = 'Description is required';
        } else if (value.trim().length < 50 || value.trim().length > 2000) {
          errorMsg = `Description must be between 50 and 2000 characters (current: ${value.trim().length})`;
        }
        break;

      case 'catnm':
        if (!value || value === 'Select Category:') {
          errorMsg = 'Please select a valid category';
        }
        break;

      case 'subcatnm':
        if (!value || value === 'Select Sub Category:') {
          errorMsg = 'Please select a valid subcategory';
        }
        break;

      case 'baseprice':
        if (!value) {
          errorMsg = 'Estimated budget value is required';
        } else if (!/^\d+(\.\d{1,2})?$/.test(value)) {
          errorMsg = 'Must be a positive number with max 2 decimal places';
        } else {
          const num = parseFloat(value);
          if (num < 1 || num > 999999999) {
            errorMsg = 'Amount must be between 1 and 999,999,999 INR';
          }
        }
        break;

      case 'startDate':
        if (!value) {
          errorMsg = 'Start Date is required';
        } else {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const startVal = new Date(value);
          if (startVal < today) {
            errorMsg = 'Start Date must not be in the past';
          }
        }
        break;

      case 'endDate':
        if (!value) {
          errorMsg = 'End Date is required';
        } else if (startDate) {
          const startVal = new Date(startDate);
          const endVal = new Date(value);
          if (endVal <= startVal) {
            errorMsg = 'End Date / Deadline must be after the Start Date';
          }
        }
        break;

      case 'status':
        if (!value) {
          errorMsg = 'Status selection is required';
        }
        break;

      case 'location':
        if (!value) {
          errorMsg = 'Location / State is required';
        }
        break;

      case 'file':
        if (!value) {
          errorMsg = 'Tender icon image is required';
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

    switch (fieldName) {
      case 'title': setTitle(value); break;
      case 'tenderNumber': setTenderNumber(value.toUpperCase()); break; // Force Uppercase
      case 'description': setDescp(value); break;
      case 'baseprice': setPrice(value); break;
      case 'startDate':
        setStartDate(value);
        if (endDate) {
          // Re-validate end date relative to new start date
          setErrors(prev => ({ ...prev, endDate: '' }));
        }
        break;
      case 'endDate': setEndDate(value); break;
      case 'status': setStatus(value); break;
      case 'location': setLocation(value); break;
      case 'subcatnm': setSubCatName(value); break;
      default: break;
    }
  };

  const handleBlur = (fieldName, value) => {
    let finalVal = value;
    if (fieldName === 'description') {
      finalVal = sanitizeHTML(value); // HTML strip sanitization
      setDescp(finalVal);
    }
    const errorMsg = validateField(fieldName, finalVal);
    setErrors(prev => ({ ...prev, [fieldName]: errorMsg }));

    // Special trigger: validate end date on start date blur and vice versa
    if (fieldName === 'startDate' && endDate) {
      const endErr = validateField('endDate', endDate);
      setErrors(prev => ({ ...prev, endDate: endErr }));
    }
    if (fieldName === 'endDate' && startDate) {
      const startErr = validateField('startDate', startDate);
      setErrors(prev => ({ ...prev, startDate: startErr }));
    }
  };

  // Validate entire form before submitting
  const validateAllFields = () => {
    const newErrors = {
      title: validateField('title', title),
      tenderNumber: validateField('tenderNumber', tenderNumber),
      description: validateField('description', descp),
      catnm: validateField('catnm', catnm),
      subcatnm: validateField('subcatnm', subcatnm),
      baseprice: validateField('baseprice', baseprice),
      startDate: validateField('startDate', startDate),
      endDate: validateField('endDate', endDate),
      status: validateField('status', status),
      location: validateField('location', location),
      file: validateField('file', file)
    };

    setErrors(newErrors);
    let isValid = true;
    Object.keys(newErrors).forEach(k => {
      if (newErrors[k]) isValid = false;
    });

    return isValid;
  };

  // ---------------- SUBMIT ----------------
  const handlesubmit = (event) => {
    event.preventDefault();

    if (lockoutTime > 0) {
      toast.error(`⚠️ Tender submission is locked. Try again in ${lockoutTime}s.`, {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    const isValid = validateAllFields();
    if (!isValid) {
      toast.warning('⚠️ Please complete the form correctly and fix all issues.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    setIsSubmitting(true);

    const form = new FormData();
    form.append("title", title.trim());
    form.append("catnm", catnm);
    form.append("subcatnm", subcatnm);
    form.append("description", descp.trim());
    form.append("baseprice", baseprice);
    form.append("uid", localStorage.getItem('email') || 'anonymous@tender.com');
    form.append("piconnm", file);

    // Extra fields to align with user specifications (passed via body)
    form.append("tenderNumber", tenderNumber);
    form.append("startDate", startDate);
    form.append("endDate", endDate);
    form.append("status", status);
    form.append("location", location);
    
    // Add documents
    documents.forEach((doc, idx) => {
      form.append(`document_${idx}`, doc);
    });

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    axios.post(__productapiurl + "save", form, config)
      .then((response) => {
        toast.success("🎉 Tender added successfully!", {
          position: 'top-right',
          autoClose: 4000,
        });

        // Reset all states
        setTitle("");
        setFile(null);
        setCatName("");
        setSubCatName("");
        setDescp("");
        setPrice("");
        setTenderNumber("");
        setStartDate("");
        setEndDate("");
        setDocuments([]);
        setStatus("draft");
        setLocation("");
        setErrors({});
        setOutput("Tender added successfully");

        // Reset file inputs in DOM
        const iconInput = document.getElementById('tenderIconFile');
        const docsInput = document.getElementById('supportingDocsFile');
        if (iconInput) iconInput.value = '';
        if (docsInput) docsInput.value = '';

        resetRateLimit('tender_rate_limit');
      })
      .catch((error) => {
        console.error(error);
        const limit = recordFailedAttempt('tender_rate_limit', 3, 30);
        if (limit.isLocked) {
          setLockoutTime(30);
          toast.error('❌ Too many failed attempts. Tender submission form locked for 30 seconds.', {
            position: 'top-right',
            autoClose: 5000,
          });
        } else {
          toast.error('❌ Failed to add tender! Server error. Please try again.', {
            position: 'top-right',
            autoClose: 4000,
          });
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const charCount = descp ? descp.length : 0;

  return (
    <>
      <div className="container-xxl py-5">
        <div className="container p-4 glass-panel rounded-4 shadow-lg bg-white">
          <div className="row g-5">
            <div className="col-lg-12 wow fadeInUp" data-wow-delay="0.1s">
              <h3 className="text-success text-uppercase fw-bold mb-3 border-bottom pb-2">Tender Details</h3>
              
              {lockoutTime > 0 && (
                <div className="alert alert-danger text-center fw-semibold mb-4">
                  🔒 Tender submissions locked. Try again in {lockoutTime}s
                </div>
              )}

              {output && <font style={{ "color": "blue", "fontWeight": "bold" }} className="d-block mb-3">{output}</font>}
              
              <form onSubmit={handlesubmit}>
                <div className="row g-3">
                  
                  {/* TENDER TITLE */}
                  <div className="col-md-6 mb-2">
                    <label htmlFor="title" className="fw-semibold mb-1">Tender Title <span className="text-danger">*</span></label>
                    <input 
                      type="text" 
                      className={`form-control ${errors.title ? 'is-invalid border-danger' : ''}`} 
                      value={title} 
                      placeholder="Enter tender title"
                      onChange={(e) => handleFieldChange('title', e.target.value)}
                      onBlur={(e) => handleBlur('title', e.target.value)}
                      disabled={lockoutTime > 0}
                    />
                    {errors.title && <small className="text-danger mt-1 d-block">{errors.title}</small>}
                  </div>

                  {/* TENDER REFERENCE ID */}
                  <div className="col-md-6 mb-2">
                    <label htmlFor="tenderNumber" className="fw-semibold mb-1">Tender Number / Reference ID <span className="text-danger">*</span></label>
                    <input 
                      type="text" 
                      className={`form-control ${errors.tenderNumber ? 'is-invalid border-danger' : ''}`} 
                      value={tenderNumber} 
                      placeholder="e.g. TND-2024-001"
                      onChange={(e) => handleFieldChange('tenderNumber', e.target.value)}
                      onBlur={(e) => handleBlur('tenderNumber', e.target.value)}
                      disabled={lockoutTime > 0}
                    />
                    <small className="text-muted d-block mt-1" style={{ fontSize: '11px' }}>
                      Enforced Uppercase. Format example: TND-2024-001
                    </small>
                    {errors.tenderNumber && <small className="text-danger mt-1 d-block">{errors.tenderNumber}</small>}
                  </div>

                  {/* CATEGORY */}
                  <div className="col-md-6 mb-2">
                    <label htmlFor="categoryname" className="fw-semibold mb-1">Category Name <span className="text-danger">*</span></label>
                    <select 
                      className={`form-control ${errors.catnm ? 'is-invalid border-danger' : ''}`} 
                      value={catnm} 
                      onChange={(e) => fetchSubCat(e.target.value)}
                      onBlur={(e) => handleBlur('catnm', e.target.value)}
                      disabled={lockoutTime > 0}
                    >
                      <option value="">-- Select Category --</option>
                      {
                        cDetails.map((row, idx) => (
                          <option key={idx} value={row.catnm}>{row.catnm}</option>
                        ))
                      }
                    </select>
                    {errors.catnm && <small className="text-danger mt-1 d-block">{errors.catnm}</small>}
                  </div>

                  {/* SUBCATEGORY */}
                  <div className="col-md-6 mb-2">
                    <label htmlFor="subcatnm" className="fw-semibold mb-1">Subcategory Name <span className="text-danger">*</span></label>
                    <select 
                      className={`form-control ${errors.subcatnm ? 'is-invalid border-danger' : ''}`} 
                      value={subcatnm} 
                      onChange={(e) => handleFieldChange('subcatnm', e.target.value)}
                      onBlur={(e) => handleBlur('subcatnm', e.target.value)}
                      disabled={!catnm || lockoutTime > 0}
                    >
                      <option value="">-- Select Sub Category --</option>
                      {
                        scDetails.map((row, idx) => (
                          <option key={idx} value={row.subcatnm}>{row.subcatnm}</option>
                        ))
                      }
                    </select>
                    {!catnm && <small className="text-muted d-block mt-1">Select a Category first to enable Subcategories</small>}
                    {errors.subcatnm && <small className="text-danger mt-1 d-block">{errors.subcatnm}</small>}
                  </div>

                  {/* BUDGET */}
                  <div className="col-md-4 mb-2">
                    <label htmlFor="baseprice" className="fw-semibold mb-1">Budget / Estimated Value (INR) <span className="text-danger">*</span></label>
                    <input 
                      type="text" 
                      className={`form-control ${errors.baseprice ? 'is-invalid border-danger' : ''}`} 
                      value={baseprice} 
                      placeholder="Enter amount in INR"
                      onChange={(e) => handleFieldChange('baseprice', e.target.value)}
                      onBlur={(e) => handleBlur('baseprice', e.target.value)}
                      disabled={lockoutTime > 0}
                    />
                    <small className="text-muted d-block mt-1" style={{ fontSize: '11px' }}>
                      💡 Enter amount in INR (e.g. 500000 or 1250000.50)
                    </small>
                    {errors.baseprice && <small className="text-danger mt-1 d-block">{errors.baseprice}</small>}
                  </div>

                  {/* START DATE */}
                  <div className="col-md-4 mb-2">
                    <label htmlFor="startDate" className="fw-semibold mb-1">Start Date <span className="text-danger">*</span></label>
                    <input 
                      type="date" 
                      className={`form-control ${errors.startDate ? 'is-invalid border-danger' : ''}`} 
                      value={startDate} 
                      onChange={(e) => handleFieldChange('startDate', e.target.value)}
                      onBlur={(e) => handleBlur('startDate', e.target.value)}
                      disabled={lockoutTime > 0}
                    />
                    {errors.startDate && <small className="text-danger mt-1 d-block">{errors.startDate}</small>}
                  </div>

                  {/* END DATE */}
                  <div className="col-md-4 mb-2">
                    <label htmlFor="endDate" className="fw-semibold mb-1">End Date / Deadline <span className="text-danger">*</span></label>
                    <input 
                      type="date" 
                      className={`form-control ${errors.endDate ? 'is-invalid border-danger' : ''}`} 
                      value={endDate} 
                      onChange={(e) => handleFieldChange('endDate', e.target.value)}
                      onBlur={(e) => handleBlur('endDate', e.target.value)}
                      disabled={lockoutTime > 0}
                    />
                    {errors.endDate && <small className="text-danger mt-1 d-block">{errors.endDate}</small>}
                  </div>

                  {/* LOCATION */}
                  <div className="col-md-6 mb-2">
                    <label htmlFor="location" className="fw-semibold mb-1">Location / State <span className="text-danger">*</span></label>
                    <select 
                      className={`form-control ${errors.location ? 'is-invalid border-danger' : ''}`}
                      value={location}
                      onChange={(e) => handleFieldChange('location', e.target.value)}
                      onBlur={(e) => handleBlur('location', e.target.value)}
                      disabled={lockoutTime > 0}
                    >
                      <option value="">-- Choose Indian State --</option>
                      {INDIAN_STATES.map((state, index) => (
                        <option key={index} value={state}>{state}</option>
                      ))}
                    </select>
                    {errors.location && <small className="text-danger mt-1 d-block">{errors.location}</small>}
                  </div>

                  {/* STATUS */}
                  <div className="col-md-6 mb-2">
                    <label htmlFor="status" className="fw-semibold mb-1">Status <span className="text-danger">*</span></label>
                    <select 
                      className={`form-control ${errors.status ? 'is-invalid border-danger' : ''}`}
                      value={status}
                      onChange={(e) => handleFieldChange('status', e.target.value)}
                      onBlur={(e) => handleBlur('status', e.target.value)}
                      disabled={lockoutTime > 0}
                    >
                      <option value="draft">Draft</option>
                      <option value="open">Open</option>
                      <option value="closed">Closed</option>
                      <option value="awarded">Awarded</option>
                    </select>
                    {errors.status && <small className="text-danger mt-1 d-block">{errors.status}</small>}
                  </div>

                  {/* DESCRIPTION */}
                  <div className="col-12 mb-2">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <label htmlFor="description" className="fw-semibold">Description <span className="text-danger">*</span></label>
                      <span className={`fw-semibold text-${charCount > 2000 || charCount < 50 ? 'danger' : 'success'}`} style={{ fontSize: '12px' }}>
                        {charCount} / 2000 characters
                      </span>
                    </div>
                    <textarea 
                      rows="4"
                      className={`form-control ${errors.description ? 'is-invalid border-danger' : ''}`} 
                      value={descp} 
                      placeholder="Provide detailed description of tender requirements (minimum 50 characters)..."
                      onChange={(e) => handleFieldChange('description', e.target.value)}
                      onBlur={(e) => handleBlur('description', e.target.value)}
                      disabled={lockoutTime > 0}
                    ></textarea>
                    {errors.description && <small className="text-danger mt-1 d-block">{errors.description}</small>}
                  </div>

                  {/* TENDER ICON FILE (IMAGE) */}
                  <div className="col-md-6 mb-2">
                    <label htmlFor="tenderIconFile" className="fw-semibold mb-1">Subcategory Tender Icon <span className="text-danger">*</span></label>
                    <input 
                      id="tenderIconFile"
                      type="file" 
                      className={`form-control ${errors.file ? 'is-invalid border-danger' : ''}`} 
                      onChange={handleTenderIconChange}
                      disabled={lockoutTime > 0}
                    />
                    <small className="text-muted d-block mt-1">Required: Upload subcategory icon file for display.</small>
                    {errors.file && <small className="text-danger mt-1 d-block">{errors.file}</small>}
                  </div>

                  {/* SUPPORTING DOCUMENTS UPLOAD */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="supportingDocsFile" className="fw-semibold mb-1">Supporting Documents (Optional)</label>
                    <input 
                      id="supportingDocsFile"
                      type="file" 
                      className={`form-control ${errors.documents ? 'is-invalid border-danger' : ''}`} 
                      multiple
                      onChange={handleDocumentChange}
                      disabled={lockoutTime > 0}
                    />
                    <small className="text-muted d-block mt-1" style={{ fontSize: '11px' }}>
                      Allowed types: PDF, DOC, DOCX. Max size: 5MB per file. Maximum files: 3
                    </small>
                    {errors.documents && <small className="text-danger mt-1 d-block">{errors.documents}</small>}
                  </div>

                </div>

                <div className="mt-4 border-top pt-3">
                  <button 
                    onClick={handlesubmit} 
                    type="submit" 
                    className="btn btn-success btn-lg px-5 fw-bold shadow"
                    disabled={isSubmitting || lockoutTime > 0}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Saving Tender...
                      </>
                    ) : lockoutTime > 0 ? (
                      `Form Locked (${lockoutTime}s)`
                    ) : (
                      'Add Tender'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default AddTender;
