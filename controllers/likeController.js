const like = require('../models/like');

module.exports.like = async(req, res) => {
    const {id} = req.param;
    const board = await board.findById(id);
    const check = board.likeUser.some((userId)=> {
        return userId === req.userInfo._id;
    });
    if (check) {
        board.likeCount -= 1;
        const idx = post.likeUser.indexOf(req.userInfo_id);
        if(idx > -1) {
            board.likeUser.splice(idx, 1);
        }
    } else {
        board.likeCount +=1;
        board.likeUser.push(req.userInfo_id);
    }
    const result = await board.save();
    res.status(200).json({
        check: check,
        board: result,
    });
}

module.exports = likeController;