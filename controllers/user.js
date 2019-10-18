const User = require("../models/user");

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
	/* Странно, что, если id короче 25, то ошибку обрабатывает catch. А если 25 символов, то then. */
		.catch((err, user) => {
			if (!user) { res.status(404).send({ message: "Нет пользователя с таким id" }); } else res.status(500).send({ message: `Возникла ошибка ${err.message}` });
		}); /* Добавлена обработка ошибки при запросе несуществующего пользователя */
};

/* Создаёт пользователя */
module.exports.createUser = (req, res) => {
	const { name, about, avatar } = req.body;

	User.create({ name, about, avatar })
		.then((user) => res.send({ data: user }))
		.catch((err) => res.status(500).send({ message: `Возникла ошибка ${err.message}` }));
};

/* Обновляет профиль */
module.exports.renewUser = (req, res) => {
	const { name, about, avatar } = req.body;

	User.findByIdAndUpdate(
		req.params.id,
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
		req.params.id,
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
