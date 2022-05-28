const comment = require('../models/comment');

module.exports.comment = async(req, res) => {
    const {id} = req.params;
    const board = await board.findById(id);
    const User = req.userInfo;
    const {comment} = req.body;
    const commentWrap = {
        comment: comment,
        user: user,
    };
    board.comment.push(commentWrap);
    const result = await board.save();
    res.status(200).json({post:result});
}

module.exports = commentController;

