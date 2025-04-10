'use strict'

const Sequelize = require('sequelize');
require('dotenv').config();

const sequelizeInstance = new Sequelize(
  process.env.DB, 
  process.env.USER, 
  process.env.PASSWORD, 
  {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    port: parseInt(process.env.MY_SQL_PORT),
    dialectOptions: {
      connectTimedOut: 10000,
    },
    operatorAliases: "false",
    pool: {
      max: parseInt(process.env.POOL_MAX),
      min: parseInt(process.env.POOL_MIN),
      acquire: parseInt(process.env.POOL_ACQUIRE),
      idle: parseInt(process.env.POOL_IDLE)
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.SequelizeInstance = sequelizeInstance;

// Importar modelos
db.curso = require('../models/cursoModel')(sequelizeInstance, Sequelize);
db.estudiante = require('../models/estudianteModel')(sequelizeInstance, Sequelize);
db.inscripcion = require('../models/inscripcionModel')(sequelizeInstance, Sequelize);

// Crear variables locales para relaciones
const Curso = db.curso;
const Estudiante = db.estudiante;
const Inscripcion = db.inscripcion;

// Relaciones
Estudiante.belongsToMany(Curso, { through: Inscripcion, foreignKey: 'idEstudiante' });
Curso.belongsToMany(Estudiante, { through: Inscripcion, foreignKey: 'idCurso' });

// Sincronizar modelos
db.SequelizeInstance.sync()
  .then(() => console.log("Modelos sincronizados con la base de datos"))
  .catch((err) => console.error("Error al sincronizar modelos:", err));

module.exports = db;