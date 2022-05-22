const express = require("express"),
	app = express(),
	homeController = require("./controllers/homeController"),
	layouts = require("express-ejs-layouts");

app.set("port", process.env.PORT || 80);
app.set("view engine", "ejs");

app.use(
	express.urlencoded({
		extended: false
	})
);
app.use(express.json());

app.get("/name", homeController.respondWithName);

app.listen(app.get("port"), () => {
	console.log(`Server running at http://localhost: ${app.get("port")}`);
});
