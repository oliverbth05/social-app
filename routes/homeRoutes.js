const express = require('express');
const homeController = require('../controllers/homeController');

const router = express.Router();

router.get('/', homeController.get_landing)
router.get('/home', homeController.get_home)

module.exports = router;