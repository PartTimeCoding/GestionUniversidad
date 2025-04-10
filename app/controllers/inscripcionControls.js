const db = require('../config/db');
const Curso = db.curso;
const Estudiante = db.estudiante
const Inscripcion = db.inscripcion;

async function inscribirEstudiante(req, res) {
  try {
    const { idEstudiante, curso } = req.body;

    const estudiante = await Estudiante.findByPk(idEstudiante);
    if (!estudiante) {
      return res.status(404).json({ message: 'Estudiante no encontrado' });
    }

     // Si es solo un curso, conviértelo en array
     const cursosArray = Array.isArray(curso) ? curso : [curso];

     // Fecha y estado por defecto
     const fechaActual = new Date();
     const estado = 'Activa';
    
     for(const idCurso of cursosArray) {
      const cursoEncontrado = await Curso.findByPk(idCurso);
      if (!cursoEncontrado) {
        return res.status(404).json({ message: `Curso con ID ${idCurso} no encontrado` });
      }

      await Inscripcion.create({
        idEstudiante: idEstudiante,
        idCurso: idCurso,
        FechaInscripcion: fechaActual,
        estadoInscripcion: estado
      });

     }

    res.status(200).json({ message: 'Inscripción completada con éxito' });
  } catch (error) {
    console.error('Error al inscribir estudiante:', error);
    res.status(500).json({ message: 'Error al inscribir estudiante', error });
  }
};

async function getCursosDeEstudiante(req, res) {
  const idEstudiante = req.params.id;

  try {
    const estudiante = await Estudiante.findByPk(idEstudiante, {
      include: {
        model: Curso,
        through: {
          attributes: ['idInscripcion', 'FechaInscripcion', 'estadoInscripcion'], // Incluye atributos de la tabla Inscripcion
        },
      },
    });

      if (!estudiante) {
          return res.status(404).send({ message: 'Estudiante no encontrado' });
      }

      res.status(200).send(estudiante.cursos); // cursos en los que está inscrito
  } catch (error) {
      res.status(500).send({ message: 'Error al obtener cursos del estudiante', error });
  }
}

module.exports = { getCursosDeEstudiante, inscribirEstudiante };