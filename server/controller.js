const server = require('./index.js')
const fs = require('fs');
let storage = {};
let uniqueTotal = 0;
let unique = 0;
let duplicates = 0;

const controller = {
  // added function for get requests that sends report to client for personal use
  reportNumbers: (req, res) => {
    if (req.params.num === 'report') {
      res.status(200).send(`Received ${unique} unique numbers, ${duplicates} duplicates. Unique total: ${uniqueTotal}`);
    }
    res.end();
  },

  addNumber: (req, res) => {
    // check for new line sequence and proper length
    if (req.params.num.length === 12 && req.params.num.slice(9,12) === '-NL') {
      let newInput = req.params.num.slice(0,9)
      // check to see if input is a valid number
      if (!isNaN(newInput)) {
        // check storage object to ensure no duplicates are being added to log
        if (!storage.hasOwnProperty(req.params.num)) {
          // increment counters and write to log file
          unique++;
          uniqueTotal++;
          storage[req.params.num] = 1;
          fs.appendFile('numbers.log', newInput + '\n', (err) => {
            if (err) throw err;
          });
          res.status(201).send('number added to log');
        } else {
          // handle duplicates
          duplicates++;
          res.status(200).send('number to be added was a duplicate');
        };
      // check for terminate command
      } else if (newInput === 'terminate') {
        // terminate client connection
        res.status(200).send('shutting down server');
        server.connection.close(() => {
          // stop reporting interval to allow shutdown
          clearInterval(intervalId);
          console.log('closing down...')
        });
      } else {
        // terminate client connection
        res.end();
      }
    } else {
      // terminate client connection
      res.end();
    }
  }
}
// create console.log interval and set function to variable so it can be cleared upon termination command
let intervalId = setInterval(() => {
  console.log(`Received ${unique} unique numbers, ${duplicates} duplicates. Unique total: ${uniqueTotal}`);
  unique = 0;
  duplicates = 0;
}, 10000);


module.exports = controller;