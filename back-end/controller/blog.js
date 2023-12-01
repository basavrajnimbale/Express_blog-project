const Blog = require('../model/blog');

exports.postBlog = async (req, res, next) => {
    try {
        const title = req.body.title;
        const author = req.body.author;
        const content = req.body.content;

        const newBlog = await Blog.create({
            title: title,
            author: author,
            content: content
        });

        console.log(newBlog);
        res.json(newBlog);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while creating the blog.' });
    }
};

exports.getBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.findAll();
        console.log('hiiii', blogs);
        res.json(blogs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching blogs.' });
    }
};

exports.getBlog = async (req, res, next) => {
    try {
        const getblog = req.params.id;
        const blog = await Blog.findByPk(getblog);
        res.json(blog);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching the blog.' });
    }
};



