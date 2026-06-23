const express = require('express');
const { initiateLogin, handleCallback } = require('../controllers/authController');
const router = express.Router();

// Route to initiate Azure AD login
router.get('/login', initiateLogin);

// Route to handle the callback from Azure AD after authentication
router.get('/callback', handleCallback);

module.exports = router;