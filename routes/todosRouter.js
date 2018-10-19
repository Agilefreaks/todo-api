const express = require('express');
const router = express.Router();

const todosRepository = require('../repository/todosRepository')

const statusController = require('../controllers/statusController');
const todosController = require('../controllers/todosController');

router.get('/status', statusController.doStatus);
router.get('/todos', todosController.getTodos(todosRepository));
router.post('/todos', todosController.addTodo(todosRepository));

module.exports = router;
