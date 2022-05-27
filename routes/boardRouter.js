var express = require('express');
var boardRouter = express.Router();
var boardsController = require('../controllers/boardController');


// 글 작성
boardRouter.post('/:boardId/board', boardController.uploadBoard);

// 글 작성 폼
boardRouter.get('/boardForm', boardController.boardForm);

// 글 조회 
boardRouter.get('/', boardController.getboardsList);

//글 삭제
boardRouter.delete('/:boardId', boardController.deleteBoard)

//글 수정

module.exports = boardRouter;
