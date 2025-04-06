const db = require('../config/db');
const Inscripcion = db.inscripciones;

async function crearInscripcion(req, res) {
    try {
        const inscripcion = await Inscripcion.create(req.body);
        res.status(201).json(inscripcion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function obtenerInscripciones(req, res) {
    try {
        const inscripciones = await Inscripcion.findAll();
        res.status(200).json(inscripciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { crearInscripcion, obtenerInscripciones };
