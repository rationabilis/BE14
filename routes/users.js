const usersRouter = require("express").Router();
const {
	getAllUsers, getUser, createUser, renewUser, renewUserAvatar,
} = require("../controllers/user");

usersRouter.get("/:id", getUser);

usersRouter.get("/", getAllUsers);

usersRouter.post("/", createUser);

usersRouter.patch("/:id", renewUser);

usersRouter.patch("/:id/avatar", renewUserAvatar);

module.exports = usersRouter;
