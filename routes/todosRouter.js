var express = require('express');
var router = express.Router();

var todosRepository = require('../repository/todosRepository')

var statusController = require('../controllers/statusController');
var todosController = require('../controllers/todosController');

router.get('/status', statusController.doStatus);
router.get('/todos', todosController.getTodos((todosRepository)));

module.exports = router;
