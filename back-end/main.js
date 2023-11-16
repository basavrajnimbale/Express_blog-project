const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const cors = require('cors');

const sequelize = require('../util/database');

const Blog = require('../model/blog')

Blog.sync();

app.use(cors());

app.use(bodyParser.json({extended: false}));

sequelize.sync()
.then((result) => {
    app.listen(3000);
})
.catch(err => console.log(err));

