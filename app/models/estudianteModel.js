'use strict'

const { DataTypes } = require('sequelize');

module.exports = (Sequelize) => { 
    const attributes = {
        idCategoria: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        nombreCategoria: {
            type: DataTypes.STRING(45),

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