'use strict'

module.exports = (sequelize, DataTypes) => { 
    const Inscripcion = sequelize.define('Inscripcion', {
        idInscripcion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        idEstudiante: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idCurso: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        FechaInscripcion: {
            type: DataTypes.DATE,
            allowNull: false
        },
        estadoInscripcion: {
            type: DataTypes.ENUM('Activa', 'Cancelada', 'Completa'),
            allowNull: false
        }
    }, {
        tableName: 'inscripcion',
        timestamps: false,
    });

    return Inscripcion;
};
