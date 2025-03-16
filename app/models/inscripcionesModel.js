'use strict'

const { DataTypes } = require('sequelize');
const { FOREIGNKEYS } = require('sequelize/lib/query-types');

module.exports = (Sequelize) => { 
    const attributes = {
        idInscripcion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        idEstudiante: {
            type: DataTypes.INTEGER,
            FOREIGNKEYS: true
        },
        idCurso: {
            type: DataTypes.INTEGER,
            FOREIGNKEYS: true
        },
        FechaInscripcion: {
            type: DataTypes.DATE,
            allowNull: false
        },
        estadoInscripcion:{
            type: DataTypes.ENUM('AC','IN'),
            allowNull:false
        }
    };
    const options = {
        defaultScope: {
            attributes: { excludes: ['createdAt', 'updatedAt']}
        },
        scopes: {},
        tableName: 'inscripciones',
        timestamps: 'false'
    };
    return Sequelize.afterDefine('inscripciones', attributes, options);
};