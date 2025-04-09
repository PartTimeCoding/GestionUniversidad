const express = require('express');
const router = express.Router();
const registroCompletoController = require('../controllers/registroCompletoController');

router.post('/', registroCompletoController.distribuirRegistroCompleto);

module.exports = router;