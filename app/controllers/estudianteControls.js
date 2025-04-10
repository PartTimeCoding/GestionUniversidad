const db = require('../config/db');
const Estudiante = db.estudiante;

async function obtenerEstudiantes(req, res) {
    try {
        // Obtener todos los estudiantes
        const estudiantes = await Estudiante.findAll();
        res.status(200).json(estudiantes); // Responder con los estudiantes
    } catch (error) {
        res.status(500).json({ error: error.message }); // Respuesta de error
    }
}

module.exports = { obtenerEstudiantes };
