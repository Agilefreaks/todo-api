const express = require('express')
const app = express()
const port = 3000

app.get('/v1/status', (req, res) => res.status(204).send(''))

app.listen(port, () => console.log(`Listening on port ${port}`))