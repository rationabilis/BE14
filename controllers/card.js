const Card = require("../models/card");

/* Вернуть все карточки */
module.exports.getAllCards = (req, res) => {
	Card.find({})
		.then((cards) => res.send({ data: cards }))
		.catch((err) => res.status(500).send({ message: `Возникла ошибка ${err.message}` }));
};

/* Создать карточку */
module.exports.createCard = (req, res) => {
	const { name, link } = req.body;

	Card.create({ name, link, owner: req.user._id })

		.then((card) => res.send({ data: card }))
		.catch((err) => res.status(500).send({ message: `Возникла ошибка ${err.message}` }));
};

/* Удалить карточку */
module.exports.deleteCard = (req, res) => {
	Card.findById(req.params.cardId)
		.then((card) => {
			const cardData = { data: card };
			if (cardData.data.owner !== req.user._id) { res.status(401).send({ message: "Нет полномочий для удаления карточки" }); } else {
				Card.findByIdAndRemove(req.params.cardId)
					.then(() => res.send(cardData));
			}
		})
		.catch((err) => res.status(500).send({ message: `Возникла ошибка ${err.message}` }));
};

/* Поставить лайк */
module.exports.likeCard = (req, res) => {
	Card.findByIdAndUpdate(
		req.params.cardId,
		{ $addToSet: { likes: req.user._id } },
		{ new: true },
	)
		.then((card) => res.send({ data: card }))
		.catch((err) => res.status(500).send({ message: `Возникла ошибка ${err.message}` }));
};

/* Убрать лайк */
module.exports.dislikeCard = (req, res) => {
	Card.findByIdAndUpdate(
		req.params.cardId,
		{ $pull: { likes: req.user._id } },
		{ new: true },
	)
		.then((card) => res.send({ data: card }))
		.catch((err) => res.status(500).send({ message: `Возникла ошибка ${err.message}` }));
};
