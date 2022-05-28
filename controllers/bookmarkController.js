const bookmark = require('../models/bookmark');

module.exports.bookmark = async(req, res) => {
    const {id} = req.param;
    const board = await board.findById(id);
    const check = board.bookmarkUser.some((userId)=> {
        return userId === req.userInfo._id;
    });
    if (check) {
        board.bookmarkCount -= 1;
        const idx = board.bookmarkUser.indexOf(req.userInfo_id);
        if(idx > -1) {
            board.bookmarkUser.splice(idx, 1);
        }
    } else {
        board.bookmarkCount +=1;
        board.bookmarkUser.push(req.userInfo_id);
    }
    const result = await board.save();
    res.status(200).json({
        check: check,
        board: result,
    });
}

module.exports = bookmarkController;