import React from 'react';
import LoginButton from '../components/LoginButton';

const HomePage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Welcome to the MERN Azure Entra Auth Demo</h2>
      <p>Please log in to continue.</p>
      <LoginButton />
    </div>
  );
};

export default HomePage;