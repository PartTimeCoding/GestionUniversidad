'use strict';

const express = require('express');
const router = express.Router();
const usuarioControls = require('../controllers/usuarioControls');

router.post('/signup', usuarioControls.signUp);
router.post('/signin', usuarioControls.signIn);
router.get('/usuarios', usuarioControls.getUsers);

module.exports = router;