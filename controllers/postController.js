const model = require("../models"),
User = model.User,
Film = model.Film,
Post = model.Post;

exports.getAllPosts = async (req, res, next) => {
    try{
        let posts = await Post.findAll({
            include: [{
                model: Film,
                where: {UserId : req.user.id}
            }],
            order: [['createdAt', 'DESC']]
        });
        res.locals.posts = posts;
    } catch(err) {
        console.log(`Error finding fimls: ${err.message}`);
    }
    next();
};

exports.createPosts = async (req, res) => {
    console.log("여기까진 들어옴");
    res.locals.user = req.user;
    await Post.create({
        FilmId : req.body.film,
        title : req.body.post_title,
        content : req.body.content
    });
  
    res.redirect(`/profile/${req.user.userIdentifier}`);
};