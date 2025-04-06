'use strict'

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => { 
    const Curso = sequelize.define('Curso',{
        idCurso: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombreCurso: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        descripcion:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        creditos:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        profesorCurso:{
            type:DataTypes.STRING(45),
            allowNull: false
        },
        horarioCurso:{
            type:DataTypes.DATE,
            allowNull:false
        }

    }, {
        tableName: 'curso',
        timestamps: false,
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        scopes: {},
    });

    return Curso;
};