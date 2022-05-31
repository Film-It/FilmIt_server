const model = require('../models');

exports.showSignup = (req, res) => {
    res.render("signup");
};

exports.postedSignup = (req, res) => {

    //아이디 중복 확인
    model.User.findOne({ where: {email:req.body.email}})
    .then(function(data)
    {
        if((data == null || data == undefined) === false){
            res.json({result:false, message:'이미 가입된 이메일입니다.'})
        }
        //데이터 삽입
        model.User.create({
	        userIdentifier : req.body.userIdentifier,
        	email : req.body.email,
	        passwd : req.body.passwd,
        	name : req.body.name,
        	nickname : req.body.nickname,
        	birth : req.body.birth,
        	gender : req.body.gender
        })
        .then(function(createdUserCore){
            res.json({result:true, message:'가입 완료되었습니다.'})
        });
    });
};
