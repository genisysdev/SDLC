// Frontend configuration variables
export const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL || 'http://localhost:5000';

// Azure AD Client ID and Redirect URI for frontend (if used directly, otherwise backend handles it)
// Usually, these are handled server-side to prevent exposure, but for quick dev/testing, they might be here.
// For this setup, we rely on the backend to initiate the redirect, so these are less critical here.
// export const AZURE_AD_CLIENT_ID = process.env.REACT_APP_AZURE_AD_CLIENT_ID;
// export const AZURE_AD_REDIRECT_URI = process.env.REACT_APP_AZURE_AD_REDIRECT_URI || 'http://localhost:3000/auth/callback';