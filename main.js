const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const cors = require('cors');

const sequelize = require('./util/database');

const Blog = require('./model/blog');

const Comment = require('./model/comment');

const route = require('./routes/blog');

Blog.hasMany(Comment);
Comment.belongsTo(Blog, {constraints:true, onDelete: 'CASCADE'});

app.use(cors());

app.use(bodyParser.json({extended: false}));

app.use(route);

sequelize.sync()
.then(() => {
    app.listen(3000);
})
.catch(err => console.log(err));

