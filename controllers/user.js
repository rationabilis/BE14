const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

/* логин */

/* Возвращает всех пользователей */
module.exports.getAllUsers = (req, res) => {
	User.find({})
		.then((users) => res.send({ data: users }))
		.catch((err) => res.status(500).send({ message: `Возникла ошибка ${err.message}` }));
};

/* Возвращает пользователя по _id */
module.exports.getUser = (req, res) => {
	User.findById(req.params.id)
		.then((user) => {
			if (!user) { res.status(404).send({ message: "Нет пользователя с таким id" }); } else res.send({ data: user });
		})
		.catch((err, user) => {
			if (!user) { res.status(404).send({ message: "Нет пользователя с таким id" }); } else res.status(500).send({ message: `Возникла ошибка ${err.message}` });
		});
};

/* Создаёт пользователя */
module.exports.createUser = (req, res) => {
	bcrypt.hash(req.body.password, 10)
		.then((hash) => User.create({
			name: req.body.name,
			about: req.body.about,
			avatar: req.body.avatar,
			email: req.body.email,
			password: hash,
		}))
		.then((user) => res.send(user))
		.catch((err) => res.status(400).send({ message: `Возникла ошибка ${err.message}` }));
};

/* Аутентификация пользователя */
module.exports.login = (req, res) => {
	const { email, password } = req.body;
	return User.findUserByCredentials(email, password)
		.then(() => {
			const token = jwt.sign({ _id: "5daaa6f11fdbf23da8c69662" }, "2fa5a3af71b147c0e696aa8ae458831ab64482d236667469bec82a548e646aeb", { expiresIn: "7d" });
			res
				.cookie("jwt", token, {
					maxAge: 3600000 * 24 * 7,
					httpOnly: true,
					sameSite: true,
				})
				.end();
		})
		.catch(() => {
			res.status(401).send({ message: "Неправильные почта или пароль" });
		});
};


/* Обновляет профиль */
module.exports.renewUser = (req, res) => {
	const { name, about, avatar } = req.body;

	User.findByIdAndUpdate(
		req.user._id,
		{ name, about, avatar },
		{
			new: true,
			runValidators: true,
			upsert: true,
		},
	)
		.then((user) => res.send({ data: user }))
		.catch((err) => res.status(500).send({ message: `Возникла ошибка ${err.message}` }));
};

/* Обновляет аватар */
module.exports.renewUserAvatar = (req, res) => {
	const { avatar } = req.body;

	User.findByIdAndUpdate(
		req.user._id,
		{ avatar },
		{
			new: true,
			runValidators: true,
			upsert: true,
		},
	)
		.then((user) => res.send({ data: user }))
		.catch((err) => res.status(500).send({ message: `Возникла ошибка ${err.message}` }));
};
