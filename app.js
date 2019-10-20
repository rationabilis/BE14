const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const mongoose = require("mongoose");
const path = require("path");
const cardsRouter = require("./routes/cards");
const usersRouter = require("./routes/users");
const wrongRouter = require("./routes/wrong");
const {	login, createUser } = require("./controllers/user");

const { PORT = 3000 } = process.env;
const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mestodb", {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

app.listen(PORT);
app.use(express.static(path.join(__dirname, "public")));

app.post("/signin", login);
app.post("/signup", createUser);
app.use("/cards", cardsRouter);
app.use("/users", usersRouter);
app.use("/*", wrongRouter);
