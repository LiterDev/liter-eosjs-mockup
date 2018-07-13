const express = require('express');
const controller = require('../../controllers/wallet.controller');

const router = express.Router();


router
  .route('/')
  .get(controller.home)
  .post(controller.address)
  .put(controller.reward);


module.exports = router;
