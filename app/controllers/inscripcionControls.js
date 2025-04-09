const db = require('../config/db');
const Inscripcion = db.inscripciones;
const Curso = db.curso;

exports.obtenerCursosPorEstudiante = async (req, res) => {
  const { idEstudiante } = req.params;

  try {
    const inscripciones = await Inscripcion.findAll({
      where: { idEstudiante },
      include: [{
        model: Curso,
        attributes: ['idCurso', 'nombreCurso', 'descripcion', 'profesorCurso', 'horarioCurso']
      }]
    });

    // Mapeamos solo los datos del curso
    const cursos = inscripciones.map(i => i.curso);

    res.json(cursos);
  } catch (error) {
    console.error("Error al obtener cursos del estudiante:", error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};