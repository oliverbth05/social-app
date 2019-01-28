const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/user/:id', userController.get_user);
router.get('/user/:id/edit', userController.get_edit_user); 
router.put('/user/:id', userController.put_user);

module.exports = router;