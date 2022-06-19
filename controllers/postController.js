const model = require("../models"),
multer = require("multer"),
path = require("path"),
User = model.User,
Film = model.Film,
Post = model.Post;

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "../public/images/");
//     },
//     filename: function (req, file, cb) {
//         const ext = path.extname(file.originalname);
//         cb(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext);
//     }
// });
// const upload = multer({storage: storage});

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
        console.log(`Error finding posts: ${err.message}`);
    }
    next();
};

exports.createPosts = async (req, res) => {
    console.log("여기까진 들어옴");
    res.locals.user = req.user;
    await Post.create({
        UserId : req.user.id,
        FilmId : req.body.film,
        title : req.body.post_title,
        content : req.body.content,
        img : req.file.path
    });
  
    res.redirect(`/profile/${req.user.userIdentifier}`);
};