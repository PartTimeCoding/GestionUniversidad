const express = require('express');
const router = express.Router();
const inscripcionControls = require('../controllers/inscripcionControls');

router.get('/cursos-estudiante/:id', inscripcionControls.getCursosDeEstudiante);
router.post('/inscribir', inscripcionControls.inscribirEstudiante);

module.exports = router;