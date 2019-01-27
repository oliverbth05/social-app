const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/login', authController.get_login);
router.get('/register', authController.get_register);

router.post('/login', authController.post_login);
router.post('/register', authController.post_register);

router.get('/logout', authController.get_logout);

module.exports = router;