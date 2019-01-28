const express = require('express');
const showController = require('../controllers/showController');

const router = express.Router();

router.get('/show/:id', showController.get_post);
router.get('/show/:id/comments', showController.get_comments);
router.post('/show/:id/comment', showController.post_comment);
router.post('/show/:id/like', showController.post_like);
router.post('/show/:id/pin', showController.post_pin);

module.exports = router;