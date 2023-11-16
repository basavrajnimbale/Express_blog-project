const Blog = require('../model/blog');

exports.postBlog = (req, res, next) => {
    const title = req.body.title;
    const author = req.body.author;
    const content = req.body.content;

    Blog.create({
        title : title,
        author : author,
        content : content
    })
    .then((r) => { console.log(r); r.json(r);})
    .catch(err => console.log(err))
}