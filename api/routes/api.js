const express = require('express');
const router = express.Router();
const { fetchVoter } = require('../middlewares/auth');
const { sendOTP, verifyOTP, fetchStats } = require('../controllers/api');

router.get('/', (req, res, next) => res.json({ msg: 'Application Running' }));
router.get('/regVoter/sendOTP', fetchVoter, sendOTP);
router.post('/regVoter/verifyOTP', verifyOTP);
router.get('/fetchStats', fetchStats);

module.exports = router;
