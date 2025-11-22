# Tender Management System

## 🚀 Quick Start

### Frontend (React)
```bash
cd tender-new
npm install
npm start
```
Runs on: `http://localhost:3000`

### Backend (Node.js/Express)
```bash
cd API
npm install
npm start
```
Runs on: `http://localhost:5001`

---

## 📝 Environment Setup

### API/.env
```env
MONGO_URI=your_mongodb_connection_string
PORT=5001
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your_random_secret_key
```

---

## 🌐 API Endpoints

- `/user` - User management
- `/category` - Categories
- `/subcategory` - Subcategories
- `/product` - Tenders/Products
- `/bid` - Bids
- `/newsletter` - Newsletter subscription
- `/contact` - Contact form

---

## 🔧 Configuration

### Switch API URL (tender-new/src/API_URL.js)

**Local:**
```javascript
const API_BASE_URL = "http://localhost:5001";
```

**Production:**
```javascript
const API_BASE_URL = "https://tender-1-j2d4.onrender.com";
```

---

## ✅ Features

- User registration & login (with password hashing)
- Category & subcategory management
- Tender/product management
- Bid submission
- Newsletter subscription
- Contact form
- Email verification

---

## 🚀 Deployment

1. Commit changes: `git add . && git commit -m "message" && git push`
2. Deploy on Render (auto-deploy if enabled)
3. Set environment variables on Render dashboard
4. Test endpoints

---

**Status**: Production Ready

---

## 🔧 Recent Fixes (Applied)

✅ **Fixed typo** in database connection message ("conected" → "connected")  
✅ **Added JWT_SECRET** to .env file (⚠️ Change in production!)  
✅ **Fixed bcrypt version** from 6.0.0 to 5.1.1 (6.0.0 doesn't exist)  
✅ **Installed all dependencies** for both frontend and backend  

### ⚠️ Action Required

1. **Update EMAIL_USER and EMAIL_PASS** in `API/.env` with valid Gmail credentials
2. **Change JWT_SECRET** to a strong random value before production deployment
3. **Test email verification** after configuring email credentials

### 📧 Gmail App Password Setup

1. Enable 2FA on your Google account
2. Go to: https://myaccount.google.com/apppasswords
3. Generate an App Password
4. Use that password in EMAIL_PASS (not your regular password)
