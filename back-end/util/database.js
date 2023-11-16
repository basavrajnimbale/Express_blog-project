const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'Basavraj@123', {
    dialect: 'mysql',
    host: 'localhost'
});

exports.module = sequelize;