'use strict'

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => { 
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
            references: {
                model: 'estudiantes',
                key: 'idEstudiante'
            }
        },
        idCurso: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'cursos',
                key: 'idCurso'
            }
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
        tableName: 'inscripciones',
        timestamps: false,
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
    });

    Inscripcion.associate = (models) => {
        Inscripcion.belongsTo(models.Estudiante, { foreignKey: 'idEstudiante', as: 'estudiante' });
        Inscripcion.belongsTo(models.Curso, { foreignKey: 'idCurso', as: 'curso' });
    };

    return Inscripcion;
};
