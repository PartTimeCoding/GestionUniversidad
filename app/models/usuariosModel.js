'use strict'

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Usuario = sequelize.define('Usuario', {
        idUsuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        usuario: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
        tableName: 'usuarios',
        timestamps: false,
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        scopes: {},
    });

    Usuario.hasOne(sequelize.models.Estudiante, { foreignKey: 'usuarioId', as: 'estudiante' });

    return Usuario;
};
