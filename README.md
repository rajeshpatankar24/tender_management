# Tender Management System

## 🚀 Quick Start

### Frontend (React)
```bash
cd tender-new
npm install
npm start
```
Runs on: `http://localhost:3000`

**Environment Variables:** `tender-new/.env` (configured for production):
```env
REACT_APP_API_BASE_URL=https://tender-management-1-5v0f.onrender.com
```
⚠️ **For local development:** Change to `http://localhost:5001` and restart the dev server

### Backend (Node.js/Express)
```bash
cd API
npm install
npm start
```
**Local:** `http://localhost:5001`  
**Production:** `https://tender-management-1-5v0f.onrender.com`

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

### Switch API URL

Now uses environment variables! Update `tender-new/.env`:

**Local:**
```env
REACT_APP_API_BASE_URL=http://localhost:5001
```

**Production:**
```env
REACT_APP_API_BASE_URL=https://tender-management-1-5v0f.onrender.com
```

⚠️ **Important:** After changing .env, restart the React dev server (`npm start`)

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

## 🚀 Deployment on Render

### Backend Deployment

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Deploy to Render"
   git push
   ```

2. **On Render Dashboard:**
   - Create a new Web Service
   - Connect your GitHub repository
   - **Root Directory:** `API`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start` (NOT `npm run dev`)
   - **Environment:** Node

3. **Set Environment Variables on Render:**
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5001
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_gmail_app_password
   FRONTEND_URL=https://your-frontend-url.com
   JWT_SECRET=your_strong_secret_key
   NODE_ENV=production
   ```

4. **Deploy and test**

### Frontend Deployment

1. Update `tender-new/.env` with production API URL:
   ```env
   REACT_APP_API_BASE_URL=https://your-render-backend-url.onrender.com
   ```

2. Build and deploy to Render/Vercel/Netlify

### ⚠️ Common Deployment Issues

- **Error: "nodemon: not found"** → Fixed! Now included in dependencies
- **Using wrong command** → Use `npm start` for production, NOT `npm run dev`
- **Environment variables missing** → Set all required env vars on Render dashboard

---

**Status**: Production Ready

---

## 🔧 Recent Fixes (Applied)

✅ **Fixed typo** in database connection message ("conected" → "connected")  
✅ **Added JWT_SECRET** to .env file (⚠️ Change in production!)  
✅ **Fixed bcrypt version** from 6.0.0 to 5.1.1 (6.0.0 doesn't exist)  
✅ **Installed all dependencies** for both frontend and backend  
✅ **Added nodemon** to dependencies (fixes Render deployment error)  
✅ **Created render.yaml** for proper Render deployment configuration  
✅ **Set up frontend .env** for proper API URL management  

### ⚠️ Action Required

1. **Update EMAIL_USER and EMAIL_PASS** in `API/.env` with valid Gmail credentials
2. **Change JWT_SECRET** to a strong random value before production deployment
3. **Test email verification** after configuring email credentials

### 📧 Gmail App Password Setup

1. Enable 2FA on your Google account
2. Go to: https://myaccount.google.com/apppasswords
3. Generate an App Password
4. Use that password in EMAIL_PASS (not your regular password)
