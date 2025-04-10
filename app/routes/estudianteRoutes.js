const express = require('express');
const router = express.Router();
const estudianteControls = require('../controllers/estudianteControls');

router.get('/getEstudiantes', estudianteControls.obtenerEstudiantes);

module.exports = router;
