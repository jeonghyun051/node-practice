const {Sequelize, DataTypes} = require('sequelize');

module.exports = function(sequelize){
    return sequelize.define('Site', {
        title: {
            field: 'title',
            type: DataTypes.STRING(50),
            allowNull: false
        },
        welcome: {
            field: 'welcome',
            type: DataTypes.STRING(200),
            allowNull: false
        },
        profile: {
            field: 'profile',
            type: DataTypes.STRING(200),
            allowNull: false
        },
        decription: {
            field: 'decription',
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        underscored: true,
        freezeTableName: true,
        timestamps: true,
        createdAt: false,
        updatedAt: false,
        tableName: 'site'
    });
}