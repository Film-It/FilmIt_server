const model = require("../models"),
User = model.User,
Post = model.Post;
const bcrypt = require('bcrypt');

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

// exports.uploadPost = async (req, res) => {
//     await model.Post.create({
//         userId : req.body.userId,
//         title : req.body.post_title,
//         content : req.body.content
//     });

//     res.redirect('/profile');
// }

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
};

exports.showSignup = (req, res) => {
    res.render("signup");
};

exports.postedSignup = async (req, res) => {
    let hash = await bcrypt.hash(req.body.passwd, 12);

    //아이디 중복 확인
    await model.User.findOne({ where: {email:req.body.email}})
    .then(async function(data)
    {
        if((data == null || data == undefined) === false){
            res.json({result:false, message:'이미 가입된 이메일입니다.'})
        }
        //데이터 삽입
        await model.User.create({
	        userIdentifier : req.body.userIdentifier,
        	email : req.body.email,
	        passwd : hash,
        	name : req.body.name,
        	nickname : req.body.nickname,
        	birth : req.body.birth,
        	gender : req.body.gender
        })
        .then(function(createdUserCore){
            // res.json({result:true, message:'가입 완료되었습니다.'})
            res.redirect('/login');
        });
    });
};
