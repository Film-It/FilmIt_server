var express = require('express');
var commentRouter = express.Router();
var commentController = require('../controllers/commentController');


// 댓글 작성
commentRouter.post('/:userId/comment', commentController.comment);

module.exports = commentRouter;