'use strict'

module.exports = (sequelize, DataTypes) => { 
    const Estudiante = sequelize.define('Estudiante',{
        idEstudiante: {
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
        fecha_nacimiento: {
            type: DataTypes.DATE,
            allowNull: false,
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
    }, {
        tableName: 'estudiante',
        timestamps: false,
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        scopes: {},
    });

    return Estudiante;
};