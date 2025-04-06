const express = require('express');
const router = express.Router();
const cursoControls = require('../controllers/cursoControls');

router.post('/', cursoControls.crearCurso);
router.get('/', cursoControls.obtenerCursos);

module.exports = router;
