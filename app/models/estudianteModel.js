'use strict'

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => { 
    const Estudiante = sequelize.define('Estudiante',{
        idEstudiante: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombreEstudiante: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        apellidoEstudiante: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        fecha_nacimiento: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        direccion: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        correoElectronico: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        telefono: {
            type: DataTypes.STRING(8),
            allowNull: false,
        },
        carrera: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    }, {
        tableName: 'estudiante',
        timestamps: false,
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        scopes: {},
    });

    Estudiante.associate = (models) => { Estudiante.hasOne(models.Usuario, {
          foreignKey: 'idEstudiante',
          as: 'usuario'
        });
      };

    return Estudiante;
};