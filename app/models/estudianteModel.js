'use strict'

const { DataTypes } = require('sequelize');

module.exports = (Sequelize) => { 
    const attributes = {
        idEstudiante: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombreEstudiante: {
            type: DataTypes.VARCHAR(50),
            allowNull: false,
        },
        apellidoEstudiante: {
            type: DataTypes.VARCHAR(50),
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
            type: DataTypes.VARCHAR(100),
            allowNull: false,
        },
        telefono: {
            type: DataTypes.VARCHAR(8),
            allowNull: false,
        },
        carrera: {
            type: DataTypes.VARCHAR(100),
            allowNull: false,
        },
    };
    const options = {
        defaultScope: {
            attributes: { excludes: ['createdAt', 'updatedAt']}
        },
        scopes: {},
        tableName: 'estudiante',
        timestamps: 'false'
    };
    return Sequelize.afterDefine('estudiante', attributes, options);
};