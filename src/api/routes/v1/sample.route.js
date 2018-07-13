const express = require('express');
const controller = require('../../controllers/sample.controller');

const router = express.Router();


router
  .route('/')
  .get(controller.hello);


module.exports = router;
