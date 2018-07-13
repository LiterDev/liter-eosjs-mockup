const express = require('express');
const controller = require('../../controllers/like.controller');

const router = express.Router();


router
  .route('/')
  .post(controller.likeUp)
  .put(controller.likeDown)



module.exports = router;
