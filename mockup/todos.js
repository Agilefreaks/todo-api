var todos = [
    { id: 1, value: "Walk dog" },
    { id: 2, value: "Buy milk" },
    { id: 3, value: "Take out trash" },
]

var JSONAPISerializer = require('jsonapi-serializer').Serializer;

var TodoSerializer = new JSONAPISerializer('todos', {
  attributes: ['value']
});

var todos = TodoSerializer.serialize(todos);

module.exports = todos;