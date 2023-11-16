const Sequelize = require('sequelize')

const sequelize = require('../util/database');

const Blog = sequelize.define('blog', {
    id:{
        type:Sequelize.INTEGER,
        autotype: true,
        allowNull: false,
        PrimaryKey: true
    },
    Title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    Author:{
        type: Sequelize.STRING,
        allowNull: false
    },
    Content:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Blog;