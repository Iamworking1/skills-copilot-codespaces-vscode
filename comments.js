// Create web server

const express = require('express');
const comments = require('../data/comments');
const router = express.Router();

// Get all comments
router.get('/', (req, res) => {
    res.json(comments);
});

// Get single comment by id
router.get('/:id', (req, res) => {
    const found = comments.some(comment => comment.id === parseInt(req.params.id));

    if (found) {
        res.json(comments.filter(comment => comment.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No comment with the id of ${req.params.id}` });
    }
});

// Create comment
router.post('/', (req, res) => {
    const newComment = {
        id: comments.length + 1,
        name: req.body.name,
        comment: req.body.comment
    };

    if (!newComment.name || !newComment.comment) {
        return res.status(400).json({ msg: 'Please include a name and comment' });
    }

    comments.push(newComment);
    res.json(comments);
});

// Update comment
router.put('/:id', (req, res) => {
    const found = comments.some(comment => comment.id === parseInt(req.params.id));

    if (found) {
        const updComment = req.body;
        comments.forEach(comment => {
            if (comment.id === parseInt(req.params.id)) {
                comment.name = updComment.name ? updComment.name : comment.name;
                comment.comment = updComment.comment ? updComment.comment : comment.comment;

                res.json({ msg: 'Comment updated', comment });
            }
        });
    } else {
        res.status(400).json({ msg: `No comment with the id of ${req.params.id}` });
    }
});

// Delete comment
router.delete('/:id', (req, res) => {
    const found = comments.some(comment => comment.id === parseInt(req.params.id));

    if (found) {
        res.json({
            msg: 'Comment deleted',
            comments: comments.filter(comment => comment.id !== parseInt(req.params.id))
        });
    } else {
        res.status(400).json({ msg: `No comment with the id of ${req.params.id}` });
    }
});

module.exports = router;