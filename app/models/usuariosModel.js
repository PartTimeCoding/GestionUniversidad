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
        },
        idEstudiante: {
            type: DataTypes.INTEGER,
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

    Usuario.associate = (models) => { Usuario.belongsTo(models.Estudiante, {
          foreignKey: 'idEstudiante',
          as: 'estudiante'
        });
      };

    return Usuario;
};
