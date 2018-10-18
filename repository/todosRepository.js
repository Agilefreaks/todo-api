let Todo = require('../model/todosModel');

var todos = [
  new Todo(1, 'Eat broccoli', true),
  new Todo(2, 'Take out trash', false)
]

exports.getTodos = function() {
    return todos;
  }
  