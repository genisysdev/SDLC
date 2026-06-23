import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_API_URL } from '../config';

const CallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('Processing authentication...');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const handleAuthCallback = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const error = searchParams.get('error');
      const errorDescription = searchParams.get('error_description');

      if (error) {
        setMessage(`Authentication failed: ${errorDescription || error}`);
        setIsError(true);
        console.error('Azure AD error:', errorDescription || error);
        return;
      }

      if (code) {
        try {
          // Send the authorization code to your backend for token exchange
          const response = await axios.get(`${BACKEND_API_URL}/api/auth/callback?code=${code}&state=${state}`);
          console.log('Backend response:', response.data);

          if (response.data.success) {
            setMessage('Authentication successful!');
            // Here you would typically store the user's session/token
            // and redirect to a protected route or home page.
            setTimeout(() => {
              navigate('/'); // Redirect to home or dashboard
            }, 2000);
          } else {
            setMessage(`Authentication failed: ${response.data.message}`);
            setIsError(true);
          }
        } catch (err) {
          console.error('Error during token exchange with backend:', err);
          setMessage('Error processing authentication with backend.');
          setIsError(true);
        }
      } else {
        setMessage('No authorization code found in callback.');
        setIsError(true);
      }
    };

    handleAuthCallback();
  }, [searchParams, navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {isError ? (
        <h2 style={{ color: 'red' }}>{message}</h2>
      ) : (
        <h2>{message}</h2>
      )}
      {!isError && <p>You will be redirected shortly...</p>}
    </div>
  );
};

export default CallbackPage;