let Todo = require('../model/todosModel');

var todos = [
  new Todo(1, 'Eat broccoli', true),
  new Todo(2, 'Take out trash', false)
]

exports.getTodos = () => {
    return todos;
  }

exports.create = (todo) => {
  let input = new Todo(
    todo[0].id, 
    todo[0].text, 
    todo[0].done
  );
  todos.push(input);
}

