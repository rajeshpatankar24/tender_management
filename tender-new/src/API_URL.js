// API endpoints configuration
// Uses environment variable from .env file
// Default to localhost if not set

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

// Debug log (remove in production if needed)
console.log("🔗 API Base URL:", API_BASE_URL);

export const __urlapi = `${API_BASE_URL}/user/`;
export const __categoryapiurl = `${API_BASE_URL}/category/`;
export const __subcategoryapiurl = `${API_BASE_URL}/subcategory/`;
export const __productapiurl = `${API_BASE_URL}/product/`;
export const __bidproductapiurl = `${API_BASE_URL}/bid/`;
export const __contactapiurl = `${API_BASE_URL}/contact/`;
export const __newsletterapiurl = `${API_BASE_URL}/newsletter/`;