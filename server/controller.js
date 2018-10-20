const server = require('./index.js')
const fs = require('fs');
let storage = {};
let total = 0;
let unique = 0;
let duplicates = 0;
const controller = {
  reportNumbers: (req, res) => {
    console.log('in get request');
    res.status(200).send('in get');
  },
  addNumber: (req, res) => {
    if (req.params.num.length === 9) {
      if (!isNaN(req.params.num)) {
        total++;
        console.log('total: ',total);
        if (!storage.hasOwnProperty(req.params.num)) {
          unique++;
          storage[req.params.num] = 1;
          fs.appendFile('numbers.log', req.params.num + '\n', (err) => {
            if (err) throw err;
            console.log('unique: ',unique);
          });
        } else {
          duplicates++;
          console.log('duplicates: ',duplicates);
        };
        res.status(200).send('thats a number');
      } else if (req.params.num === 'terminate') {
        res.status(200).send('thats a terminate');
      } else {
        server.server.close(() => {
          console.log('closing down...');
        });
      }
    } else {
      server.server.close(() => {
        console.log('closing down...')
      });
    }
  }
}


module.exports = controller;