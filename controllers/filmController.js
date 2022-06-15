const model = require("../models"),
User = model.User,
Film = model.Film;

exports.getAllFilms = async (req, res, next) => {
    res.locals.user = req.user;
    try{
        let films = await Film.findAll({
            include: [{
                model: User,
                where: {id : req.user.id}
            }],
            order: [['createdAt', 'DESC']]
        });
        res.locals.films = films;
    } catch(err) {
        console.log(`Error finding fimls: ${err.message}`);
    }
    next();
};