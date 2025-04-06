const db = require('../config/db');
const Estudiante = db.estudiantes;

async function crearEstudiante(req, res) {
    try {
        const estudiante = await Estudiante.create(req.body);
        res.status(201).json(estudiante);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function obtenerEstudiantes(req, res) {
    try {
        const estudiantes = await Estudiante.findAll();
        res.status(200).json(estudiantes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { crearEstudiante, obtenerEstudiantes };
