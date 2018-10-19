const express = require('express');
const app = express();
const port = 3000;

const todosRouter = require('./routes/todosRouter');

app.use('/v1', todosRouter);

if (!module.parent)
    app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app
