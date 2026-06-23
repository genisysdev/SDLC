import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CallbackPage from './pages/CallbackPage';
import './App.css'; // For basic styling if needed

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Azure Entra Login Demo</h1>
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/callback" element={<CallbackPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;