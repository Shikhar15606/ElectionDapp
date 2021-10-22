const express = require('express');
const router = express.Router();
const { checkCredentials } = require('../middlewares/auth');
const { login, logout, checkAuth } = require('../controllers/auth');

router.post('/login', checkCredentials, login);

router.get('/logout', logout);

router.get('/isAdmin', checkAuth);

module.exports = router;
