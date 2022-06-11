const model = require("../models"),
User = model.User,
Post = model.Post;

exports.getAllUsers = async (req, res, next) => {
    try{
        data = await User.findAll();
        console.log(data);
        res.render("user", {users: data})
    } catch(err) {
        res.status(500).send({
            message: err.message
        });
    }
    next();
};

exports.uploadPost = async (req, res) => {
    await model.Post.create({
        userId : req.body.userId,
        title : req.body.post_title,
        content : req.body.content
    });

    res.redirect('/profile');
}
