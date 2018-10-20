const express = require('express');
const router = express.Router();
const controller = require('./controller.js');

router
    .route('/numbers/:num')
    .get(controller.reportNumbers)
    .post(controller.addNumber)

module.exports = router;