'use strict'

const Sequelize = require('sequelize');
require('dotenv').config();

const sequelizeInstance = new Sequelize
(process.env.DB, process.env.USER, process.env.PASSWORD, {
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
});

const db = {};

db.Sequelize = Sequelize;
db.SequelizeInstance = sequelizeInstance;

db.cursos = require('../models/cursoModel')(sequelizeInstance, Sequelize);
db.estudiantes = require('../models/estudianteModel')(sequelizeInstance, Sequelize);
db.inscripciones = require('../models/inscripcionesModel')(sequelizeInstance, Sequelize);
db.usuarios = require('../models/usuariosModel')(sequelizeInstance, Sequelize);

db.estudiantes.hasOne(db.usuarios, {foreignKey: 'idEstudiante', as: 'usuario'});
db.usuarios.belongsTo(db.estudiantes, {foreignKey: 'idEstudiante', as: 'estudiante'});

db.SequelizeInstance.sync()
    .then(() => console.log("Modelos sincronizados con la base de datos"))
    .catch((err) => console.error("Error al sincronizar modelos:", err));

module.exports = db;