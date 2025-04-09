'use strict'

const { DataTypes } = require('sequelize');

// models/cursoModel.js

module.exports = (sequelize, DataTypes) => {
    const Curso = sequelize.define('curso', {
      idCurso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombreCurso: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      profesorCurso: {
        type: DataTypes.STRING,
        allowNull: false
      },
      horarioCurso: {
        type: DataTypes.TIME,
        allowNull: false
      }
    }, {
      tableName: 'curso', // Asegura que Sequelize use el nombre correcto en BD
      timestamps: false   // Desactiva createdAt y updatedAt si no los usas
    });
  
    return Curso;
  };