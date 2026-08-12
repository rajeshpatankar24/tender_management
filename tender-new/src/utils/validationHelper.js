/**
 * Validation and Rate Limiting Utilities for Tender Management App
 */

// --- RATE LIMITING UTILITIES ---

/**
 * Checks if a specific form is rate limited.
 * @param {string} key - LocalStorage key
 * @returns {{ isLocked: boolean, secondsRemaining: number }}
 */
export const checkRateLimit = (key) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return { isLocked: false, secondsRemaining: 0 };
    
    const data = JSON.parse(raw);
    const now = Date.now();
    
    if (data.lockedUntil && now < data.lockedUntil) {
      const remainingMs = data.lockedUntil - now;
      return { 
        isLocked: true, 
        secondsRemaining: Math.ceil(remainingMs / 1000) 
      };
    }
    
    // Lock expired naturally, but let's check
    if (data.lockedUntil && now >= data.lockedUntil) {
      // Clear data or reset attempts on expiration
      localStorage.removeItem(key);
    }
    
    return { isLocked: false, secondsRemaining: 0 };
  } catch (e) {
    console.error("Rate limit check error:", e);
    return { isLocked: false, secondsRemaining: 0 };
  }
};

/**
 * Records a failed attempt for rate limiting.
 * @param {string} key - LocalStorage key
 * @param {number} maxAttempts - Max allowed failed attempts
 * @param {number} lockDurationSeconds - Lock duration in seconds
 * @returns {{ isLocked: boolean, secondsRemaining: number, attempts: number }}
 */
export const recordFailedAttempt = (key, maxAttempts, lockDurationSeconds) => {
  try {
    const raw = localStorage.getItem(key);
    const now = Date.now();
    let data = { attempts: 0, lastAttempt: now, lockedUntil: 0 };
    
    if (raw) {
      try {
        data = JSON.parse(raw);
      } catch (e) {
        // use default
      }
    }
    
    data.attempts = (data.attempts || 0) + 1;
    data.lastAttempt = now;
    
    if (data.attempts >= maxAttempts) {
      data.lockedUntil = now + (lockDurationSeconds * 1000);
    }
    
    localStorage.setItem(key, JSON.stringify(data));
    
    if (data.lockedUntil && now < data.lockedUntil) {
      return {
        isLocked: true,
        secondsRemaining: lockDurationSeconds,
        attempts: data.attempts
      };
    }
    
    return {
      isLocked: false,
      secondsRemaining: 0,
      attempts: data.attempts
    };
  } catch (e) {
    console.error("Record failed attempt error:", e);
    return { isLocked: false, secondsRemaining: 0, attempts: 1 };
  }
};

/**
 * Resets the rate limiting counter (usually on success).
 * @param {string} key - LocalStorage key
 */
export const resetRateLimit = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error("Reset rate limit error:", e);
  }
};


// --- PASSWORD STRENGTH UTILITY ---

/**
 * Measures password complexity.
 * @param {string} password 
 * @returns {{ strength: 'Weak' | 'Medium' | 'Strong', score: number, criteria: object }}
 */
export const getPasswordStrength = (password) => {
  if (!password) {
    return { strength: 'Weak', score: 0, criteria: {} };
  }
  
  const hasLength = password.length >= 8;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecial = /[@$!%*?&]/.test(password);
  
  let score = 0;
  if (hasLength) score += 1;
  if (hasLower && hasUpper) score += 1;
  if (hasDigit) score += 1;
  if (hasSpecial) score += 1;
  
  let strength = 'Weak';
  if (score >= 4 && password.length >= 8) {
    strength = 'Strong';
  } else if (score >= 2 && password.length >= 6) {
    strength = 'Medium';
  }
  
  return {
    strength,
    score,
    criteria: {
      length: hasLength,
      lowercase: hasLower,
      uppercase: hasUpper,
      digit: hasDigit,
      special: hasSpecial
    }
  };
};


// --- HTML SANITIZATION UTILITY ---

/**
 * Strips dangerous HTML elements and event handlers to prevent XSS.
 * @param {string} text 
 * @returns {string}
 */
export const sanitizeHTML = (text) => {
  if (!text) return '';
  
  // Remove script, iframe, object, embed, style, link tags and their contents
  let clean = text.replace(/<(script|iframe|object|embed|style|link)[^>]*>([\s\S]*?)<\/\1>/gi, '');
  
  // Remove self-closing tags or single tags of these types
  clean = clean.replace(/<(script|iframe|object|embed|style|link)[^>]*\/?>/gi, '');
  
  // Remove inline event handlers (e.g. onload, onclick, onerror)
  clean = clean.replace(/\s+on\w+\s*=\s*(['"][^'"]*['"]|[^\s>]+)/gi, '');
  
  // Remove javascript: pseudo-protocol links
  clean = clean.replace(/href\s*=\s*(['"]\s*javascript:[^'"]*['"]|javascript:[^\s>]+)/gi, '');
  
  return clean;
};


// --- TEXT FORMATTING UTILITY ---

/**
 * Capitalizes the first letter of each word.
 * @param {string} str 
 * @returns {string}
 */
export const capitalizeWords = (str) => {
  if (!str) return '';
  return str
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
