const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const sampleRoutes = require('./sample.route');
const walletRoutes = require('./wallet.route');
const likeRoutes = require('./like.route');
const writeRoutes = require('./write.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/sample', sampleRoutes);
router.use('/wallet', walletRoutes);
router.use('/like', likeRoutes);
router.use('/write', writeRoutes);

module.exports = router;
