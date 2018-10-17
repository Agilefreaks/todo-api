var todos = [
    { id: 1, text: "Walk dog", checked: true },
    { id: 2, text: "Buy milk", checked: true },
    { id: 3, text: "Take out trash", checked: true },
    { id: 4, text: "World domination", checked: false },
]

var JSONAPISerializer = require('jsonapi-serializer').Serializer;

var TodoSerializer = new JSONAPISerializer('todos', {
  attributes: ['text', 'checked']
});

var serializedTodos = TodoSerializer.serialize(todos);

module.exports = serializedTodos;