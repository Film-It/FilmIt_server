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

exports.getAllFilmTitles = async (req, res, next) => {
    try{
        let filmTitles = await Film.findAll({
            where: {UserId : req.user.id},
            attributes: ['id', 'title'],
            order: [['createdAt', 'DESC']]
        });
        res.locals.filmTitles = filmTitles;
    } catch(err) {
        console.log(`Error finding filmtitles: ${err.message}`);
    }
    next();
};

exports.createFilm = async (req, res) => {
    await Film.create({
        UserId : req.user.id,
        title : req.body.title
    });
  
    res.redirect(`/profile/${req.user.userIdentifier}`);
};