const express = require('express');
const controller = require('../../controllers/write.controller');

const router = express.Router();


router
  .route('/')
  .post(controller.write)



module.exports = router;
