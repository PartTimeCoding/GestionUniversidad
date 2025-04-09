const db = require('../config/db');
const RegistroCompleto = db.registro_completo; // si lo agregaste como modelo, si no es temporal
const Estudiante = db.estudiantes;
const Usuario = db.usuarios;
const Inscripcion = db.inscripciones;

const distribuirRegistroCompleto = async (req, res) => {
  const {
    nombreEstudiante,
    apellidoEstudiante,
    usuario,
    password,
    fecha_nacimiento,
    direccion,
    correoElectronico,
    telefono,
    carrera,
    idCurso,
    fechaInscripcion,
    estadoInscripcion
  } = req.body;

  try {
    // 1. Insertar en estudiante
    const nuevoEstudiante = await Estudiante.create({
      nombreEstudiante,
      apellidoEstudiante,
      fecha_nacimiento,
      direccion,
      correoElectronico,
      telefono,
      carrera
    });

    // 2. Insertar en usuarios
    await Usuario.create({
      usuario,
      password,
      idEstudiante: nuevoEstudiante.idEstudiante
    });

    // 3. Insertar en inscripciones
    await Inscripcion.create({
      idEstudiante: nuevoEstudiante.idEstudiante,
      idCurso,
      fechaInscripcion: fechaInscripcion || new Date(),
      estadoInscripcion: estadoInscripcion || 'pendiente'
    });

    res.status(201).json({ mensaje: 'Registro distribuido correctamente' });
  } catch (error) {
    console.error('Error al distribuir registro completo:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { distribuirRegistroCompleto };