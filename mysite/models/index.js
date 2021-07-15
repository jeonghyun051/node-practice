const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        timezone : "+09:00",
        dialect: 'mysql'
    }
);

const User = require('./User')(sequelize);

User.sync({
    force: process.env.TABLE_CREATE_ALWAYS === 'true',
    alter: process.env.TABLE_ALTER_SYNC === 'true'
});


const Guestbook = require('./Guestbook')(sequelize);

Guestbook.sync({
    force: process.env.TABLE_CREATE_ALWAYS === 'true',
    alter: process.env.TABLE_ALTER_SYNC === 'true'
});

module.exports = { User,Guestbook }