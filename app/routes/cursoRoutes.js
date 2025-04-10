const express = require('express');
const router = express.Router();
const cursoControls = require('../controllers/cursoControls');

router.get('/getCursos', cursoControls.getCursos);

module.exports = router;