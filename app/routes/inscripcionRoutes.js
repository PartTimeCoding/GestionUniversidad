// routes/inscripcionRoutes.js
const express = require('express');
const router = express.Router();
const inscripcionControls = require('../controllers/inscripcionControls');

// Ruta para obtener cursos inscritos por estudiante
router.get('/estudiante/:idEstudiante', inscripcionControls.obtenerCursosPorEstudiante);

module.exports = router;