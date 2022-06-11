const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.post('/:userId/like', likeController.like);

module.exports = likeRouter;