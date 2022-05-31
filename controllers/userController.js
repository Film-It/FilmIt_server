const db = require("../models/index"),
User = db.User;

exports.getAllUsers = async (req, res) => {
    try{
        data = await User.findAll();
        console.log(data);
        res.render("user", {users: data})
    } catch(err) {
        res.status(500).send({
            message: err.message
        });
    }
};