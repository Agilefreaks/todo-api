const express = require('express');
const app = express();
const port = 3000;

var todos = require('./mockup/todos')

app.get('/v1/status', (_, res) => res.status(204).send(''));
app.get('/v1/todos', function (_, res) {
    res.header('Content-Type', 'application/vnd.api+json');
    res.send(todos);
});

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app
