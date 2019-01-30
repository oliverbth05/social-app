const express = require('express');
const homeController = require('../controllers/homeController');

const router = express.Router();

router.get('/', homeController.get_landing)
router.get('/home', homeController.get_home)

router.get('/new', homeController.get_new)
router.post('/new', homeController.post_new)

router.get('/notifications', homeController.get_notifications)

module.exports = router;