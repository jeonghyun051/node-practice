const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        timezone : "+09:00",
        dialect: 'mysql'
    }
);

const User = require('./User')(sequelize);
const Guestbook = require('./Guestbook')(sequelize);
const Gallery = require('./Gallery')(sequelize);
const Site = require('./Site')(sequelize);
const Board = require('./Board')(sequelize);

User.hasMany(Board, {
    foreignKey: {
        name: 'userNo',
        allowNull: false, // userNo는 null 들어가면 안된다.
        constraints: true, // 제약 조건 주기, 없는 userNo면 안들어가게
        onDelete: 'CASCADE' // 상위테이블 삭제 시 하위테이블 삭제
    }
});
Board.belongsTo(User);
User.sync({
    force: process.env.TABLE_CREATE_ALWAYS === 'true',
    alter: process.env.TABLE_ALTER_SYNC === 'true'
});

Guestbook.sync({
    force: process.env.TABLE_CREATE_ALWAYS === 'true',
    alter: process.env.TABLE_ALTER_SYNC === 'true'
});

Gallery.sync({
    force: process.env.TABLE_CREATE_ALWAYS === 'true',
    alter: process.env.TABLE_ALTER_SYNC === 'true'
});

Site.sync({
    force: process.env.TABLE_CREATE_ALWAYS === 'true',
    alter: process.env.TABLE_ALTER_SYNC === 'true'
});

Board.sync({
    force: process.env.TABLE_CREATE_ALWAYS === 'true',
    alter: process.env.TABLE_ALTER_SYNC === 'true'
});

module.exports = { User,Guestbook,Gallery,Site,Board }