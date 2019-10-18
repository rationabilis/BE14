const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const path = require("path");
const cardsRouter = require("./routes/cards");
const usersRouter = require("./routes/users");
const wrongRouter = require("./routes/wrong");


const { PORT = 3000 } = process.env;
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mestodb", {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

app.use((req, res, next) => {
	req.user = {
		_id: "5da4c4f0f9cfc253d4d63e5b",
	};

	next();
});


app.listen(PORT);
app.use(express.static(path.join(__dirname, "public")));

app.use("/cards", cardsRouter);
app.use("/users", usersRouter);
app.use("/*", wrongRouter);
