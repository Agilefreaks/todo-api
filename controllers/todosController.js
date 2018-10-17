var todosRepository = require('../repository/todosRepository')

exports.getTodos = function (_, res) {
  var todos = serialize(todosRepository.getTodos());
  res.header('Content-Type', 'application/vnd.api+json');
  res.send(todos);
}

serialize = function(input) {
  var JSONAPISerializer = require('jsonapi-serializer').Serializer;
  
  var TodoSerializer = new JSONAPISerializer('todos', {
    attributes: ['text', 'checked']
  });

  return TodoSerializer.serialize(input);
}
  