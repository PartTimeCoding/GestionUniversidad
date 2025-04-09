'use strict'

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => { 
    const RegistroCompleto = sequelize.define('registro_completo', {
        idRegistro: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombreEstudiante: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apellidoEstudiante: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        usuario: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        direccion: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        correoElectronico: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        carrera: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idCurso: {
            type: DataTypes.INTEGER,
        },
        fechaInscripcion: {
            type: DataTypes.DATE,
            allowNull: true
        },
        estadoInscripcion: {
            type: DataTypes.ENUM('pendiente', 'confirmada'),
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

    return RegistroCompleto;
};
