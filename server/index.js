const express = require('express');
const app = express();
const server = require('http').createServer(app);
const router = require('./router.js')
const bodyParser = require('body-parser')
const port = 4000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/newrelic/', router);
server.listen(port, () => console.log(`listening on port ${port}`));

module.exports = server;