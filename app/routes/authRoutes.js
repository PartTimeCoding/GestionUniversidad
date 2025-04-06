'use strict'

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const usuarioControls = require('../controllers/usuarioControls');

router.post('/signup', usuarioControls.signUp);

router.post('/signin', usuarioControls.signIn);

router.get('/profile', authMiddleware.isAuth, (req, res) => {
    res.status(200).send({
        message: 'Este es el perfil del usuario autenticado',
        user: req.user,
    });
});

module.exports = router;
