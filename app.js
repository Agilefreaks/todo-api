const express = require('express');
const app = express();
const port = 3000;

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

app.get('/v1/status', (req, res) => res.status(204).send(''));

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app
