'use strict'

const { DataTypes } = require('sequelize');

module.exports = (Sequelize) => { 
    const attributes = {
        idCurso: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombreCurso: {
            type: DataTypes.VARCHAR(100),
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
            type:DataTypes.VARCHAR(45),
            allowNull: false
        },
        horarioCurso:{
            type:DataTypes.DATE,
            allowNull:false
        }

    };
    const options = {
        defaultScope: {
            attributes: { excludes: ['createdAt', 'updatedAt']}
        },
        scopes: {},
        tableName: 'curso',
        timestamps: 'false'
    };
    return Sequelize.afterDefine('curso', attributes, options);
};