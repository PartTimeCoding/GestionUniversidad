const db = require('../config/db');
const Curso = db.curso;

async function getCursos(req, res) {
  await Curso.findAll()
    .then(data => {
      if (!data) { res.status(404).send({ message: 'No se encontraron cursos' }) }
      else {
          res.status(200).send(data);
      }
  })
    .catch(err => {
      res.status(500).send({
          message: err.message || "Sucedio un error al obtener los cursos de la universidad"
      })
  })
}

module.exports = { getCursos }