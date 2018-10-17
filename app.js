const express = require('express');
const app = express();
const port = 3000;

var todosRouter = require('./routes/todosRouter')

app.use('/v1', todosRouter)
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app
