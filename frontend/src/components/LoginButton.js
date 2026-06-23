import React from 'react';
import axios from 'axios';
import { BACKEND_API_URL } from '../config';

const LoginButton = () => {
  const handleLogin = async () => {
    try {
      // Call backend to get the Azure AD authorization URL
      const response = await axios.get(`${BACKEND_API_URL}/api/auth/login`);
      const { redirectUrl } = response.data;
      if (redirectUrl) {
        window.location.href = redirectUrl; // Redirect browser to Azure AD
      } else {
        alert('Failed to get Azure AD login URL.');
      }
    } catch (error) {
      console.error('Error initiating login:', error);
      alert('Error initiating login. Please try again.');
    }
  };

  return (
    <button onClick={handleLogin} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
      Login with Azure Entra
    </button>
  );
};

export default LoginButton;