const express = require('express');
const followRouter = express.Router();
const followController = require('../controllers/followController');

// 팔로우
followRouter.post('/:userId/Follow', followController.Follow);

module.exports = followRouter;