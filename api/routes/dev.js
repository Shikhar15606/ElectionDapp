// only for development & testing
const { registerVoter, vote } = require('../controllers/dev');
const express = require('express');
const router = express.Router();

router.get('/registerVoter', registerVoter);
router.get('/vote', vote);

module.exports = router;
