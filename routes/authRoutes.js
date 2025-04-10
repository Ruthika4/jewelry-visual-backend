const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register); // For both user and admin registration
router.post('/login', login);       // Shared login route with role detection

module.exports = router;
