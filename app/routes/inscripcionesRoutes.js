const express = require('express');
const router = express.Router();
const inscripcionControls = require('../controllers/inscripcionesControls');

router.post('/', inscripcionControls.crearInscripcion);
router.get('/', inscripcionControls.obtenerInscripciones);

module.exports = router;
