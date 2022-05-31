const express = require("express"),
	app = express(),
	homeController = require("./controllers/homeController"),
	loginController = require("./controllers/loginController"),
	userController = require("./controllers/userController"),
	signupController = require("./controllers/signupController"),
	layouts = require("express-ejs-layouts"),
	db = require("./models/index");

app.set("port", process.env.PORT || 80);
app.set("view engine", "ejs");
app.engine("html", require('ejs').renderFile);
app.use('/public', express.static(__dirname + '/public'));

app.use(
	express.urlencoded({
		extended: false
	})
);
app.use(express.json());

db.sequelize.sync({ force: true })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.get("/name", homeController.respondWithName);
app.get("/login", loginController.showLogin);
app.post("/login", loginController.postedLogin);
app.get("/users", userController.getAllUsers);
app.get("/signup", signupController.showSignup);
app.post("/signup", signupController.postedSignup);

app.listen(app.get("port"), () => {
	console.log(`Server running at http://localhost: ${app.get("port")}`);
});
