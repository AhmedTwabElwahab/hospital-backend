const express = require('express');
const router = express.Router();
const {Login} = require('../controllers/auth/login');
const {Register} = require('../controllers/auth/register');
const {Validate} = require('../middleware/validate');
const registerRequest = require('../Request/authRequest')
/**
 * Login 
 */
router.post('/login', Login);

/**
 * Register 
 */
router.post('/register',registerRequest,Validate, Register);

module.exports = router;