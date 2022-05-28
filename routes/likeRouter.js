var express = require('express');
var likeRouter = express.Router();
var likesController = require('../controllers/likeController');


// 좋아요
likeRouter.post('/:userId/like', likeController.like);

module.exports = likeRouter;