const model = require("../models"),
User = model.User,
Film = model.Film;

exports.getAllFilms = async (req, res, next) => {
    try{
        let films = await Film.findAll({
            include: [{
                model: User,
                where: {userIdentifier : req.params.id}
            }],
            order: [['createdAt', 'DESC']]
        });
        res.locals.films = films;
    } catch(err) {
        console.log(`Error finding fimls: ${err.message}`);
    }
    next();
};