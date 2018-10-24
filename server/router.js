const express = require('express');
const router = express.Router();
const {reportNumbers, addNumber} = require('./controller.js');

router
    .route('/numbers/:num')
    .get(reportNumbers)
    .post(addNumber)

module.exports = router;