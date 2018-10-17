var express = require('express');
var router = express.Router();

var statusController = require('../controllers/statusController');
var todosController = require('../controllers/todosController');

router.get('/status', statusController.doStatus);
router.get('/todos', todosController.getTodos);

module.exports = router;
