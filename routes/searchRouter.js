var express = require('express');
var searchRouter = express.Router();
var searchController = require('../controllers/searchController');


// 검색
searchRouter.get('/search', searchController.search);

module.exports = searchRouter;