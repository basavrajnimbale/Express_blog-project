const express = require('express');

const route = express.Router();

const Blog = require('../controller/blog');

const Comment = require('../controller/delete')

route.post('/add-blog', Blog.postBlog);

route.get('/get-blogs', Blog.getBlogs);

route.post('/add-comment', Comment.postComment)

route.get('/delete-comment/:id', Comment.deleteComment);

route.get('/get-blog/:id', Blog.getBlog);

route.get('/get-comments/:id', Comment.getComments)

module.exports = route;