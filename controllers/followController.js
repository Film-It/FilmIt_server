// const { Router } = require('express');
// const { route } = require('express/lib/application');
// const follow = require('../models/follow');

const db = require("../models/index"),
    Follow = db.Follow,
  getFollowParams = body => {
    return{
      email : body.email,
      userIdentifier : body. userIdentifier,
      nickname : body. nickname,
      profileIcon : body.profileIcon
    };
  };

  module.exports = {
    index:async(req,res,next) => {
      try{
        let follow = await Follow.findAll();
        res.locals.follow = follow;
        next();
      }
      catch(error) {
        console.log(`팔로워를 불러오지 못했습니다. : ${error.message}`);
        next(error);
      };
    },
    indexView: (req,res) => {
      res.render("follow/index");
    },
    create : async (req, res, next) => {
      let followParams = getFollowParams(req.body);
        try {
          let follow = await Follow.create(followParams);
          res.locals.redirect = "/follow"
          res.locals.follow = follow;
          next();
      } catch(error) {
        console.log(`팔로우 오류 : ${error.message}`);
        next(error);
      };
    },
    delete : async (req, res, next) => {
      let follow
    }
    
    
  }


// const { Op } = require("sequelize");

// const User = require("../Models/User");
// const Follow = require("../Models/Follow");

// module.exports = {
//   async store(req, res) {
//     const { user_id } = req.params;

//     const user = await User.findByPk(user_id);

//     if (!user)
//       return res.status(404).send({ message: "사용자를 찾을 수 없습니다." });

//     if (user.id === req.userId)
//       return res.status(400).send({ message: "본인은 팔로우 할 수 없습니댜" });

//     const follow = await Follow.findOne({
//       where: { [Op.and]: [{ user_to: user.id }, { user_from: req.userId }] }
//     });

//     //follow 상태에서 follow 누르면 unfollow t
//     // 팔로우 (from -> to)
//     if (follow) {
//       await follow.destroy();
//       return res.send();
//     } else {
//       await Follow.create({
//         user_from: req.userId,
//         user_to: user.id
//       });
//       return res.send();
//     }
//   }
// };

