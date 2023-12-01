const Comment = require('../model/comment');
const Blog = require('../model/blog')

exports.postComment = async (req, res, next) => {
    try {
        console.log(req.body, 'hello');
        const commentText = req.body.comment;
        const id = req.body.id;
        console.log('this is postcomment', commentText);

        if (!commentText || commentText.trim() === '') {
            return res.status(400).json({ error: 'Comment cannot be empty' });
        }

        const newComment = await Comment.create({
            comment: commentText,
            BlogId: id
        });

        res.json(newComment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while creating the comment.' });
    }
};

exports.deleteComment = async (req, res, next) => {
    try {
        const commentId = req.params.id;
        const deletedCommentCount = await Comment.destroy({ where: { id: commentId } });
        res.json({ deletedCount: deletedCommentCount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while deleting the comment.' });
    }
};

exports.getComments = async (req, res, next) => {
    try {
        const blogId = req.params.id;
        console.log(blogId + 'bloggggg');
        
        const blog = await Blog.findByPk(blogId);
        const comments = await blog.getComments();

        res.json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching comments.' });
    }
};