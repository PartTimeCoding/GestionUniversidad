const express = require('express');
const router = express.Router();
const estudianteControls = require('../controllers/estudianteControls');

router.get('/', estudianteControls.obtenerEstudiantes);

module.exports = router;
