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

//main.js에서 URL로 넘어오는 :id 통해서 현재 유저 찾는 메서드
exports.findUser = async (req, res, next) => {
    const userId = req.params.id;
    console.log(`${userId}`);
    try{
        let user = await User.findOne({
            where: {userIdentifier : userId}
        });
        res.locals.user = user;
        
    } catch(err){
        console.log(`Error finding user by :id: ${err.message}`);
    }
    next();
}