const db = require('../config/db');
const Curso = db.cursos;

async function crearCurso(req, res) {
    try {
        const curso = await Curso.create(req.body);
        res.status(201).json(curso);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function obtenerCursos(req, res) {
    try {
        const cursos = await Curso.findAll();
        res.status(200).json(cursos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { crearCurso, obtenerCursos };
