var Todo = require('../model/todosModel');

var JSONAPISerializer = require('jsonapi-serializer').Serializer;
var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;

var TodoSerializer = new JSONAPISerializer('todo', {
  attributes: ['text', 'done'],
  pluralizeType: false
});

exports.getTodos = function(repository) {
  return function (_, res) {
    let todos = TodoSerializer.serialize(repository.getTodos());
    res.header('Content-Type', 'application/vnd.api+json');
    res.send(todos);
  } 
}

exports.addTodo = function(repository) {
  return async function(req, res) {
    await new JSONAPIDeserializer().deserialize(req.body, (_, todo) => {
      repository.create(todo);
      res.status(201)
        .header('Content-Type', 'application/vnd.api+json')
        .header('Location', `v1/todos/${todo[0].id}`)
        .send(req.body);
    });
  }  
} 
  