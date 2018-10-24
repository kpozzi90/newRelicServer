const express = require('express');
const app = express();
const server = require('http').createServer(app);
const router = require('./router.js')
const fs = require('fs');
const port = 4000;

app.use('/newrelic/', router);

// check if numbers.log file exists
fs.stat('numbers.log', function (err, stats) {
  if (err) {
      return console.error('file has not yet been created');
  } else {
    // delete numbers.log file upon startup
    fs.unlinkSync('numbers.log');
  };
});

server.listen(port, () => console.log(`listening on port ${port}`));
// limit max client connections to 5
server.maxConnections = 5;

module.exports.connection = server;