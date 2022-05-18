const port = 80,
	express = require("express"),
	app = express();

app.get("/", (req, res) => {
	res.send("Hello, Universe!");
})

app.use(
	express.urlencoded({
		extended: false
	})
);
app.use(express.json());

.listen(port, () => {
	console.log(`The Express.js server: ${port}`);
});
