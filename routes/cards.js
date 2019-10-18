const cardsRouter = require("express").Router();
const {
	getAllCards, createCard, deleteCard, likeCard, dislikeCard,
} = require("../controllers/card");

cardsRouter.get("/", getAllCards);

cardsRouter.post("/", createCard);

cardsRouter.delete("/:cardId", deleteCard);

cardsRouter.put("/:cardId/likes", likeCard);

cardsRouter.delete("/:cardId/likes", dislikeCard);

module.exports = cardsRouter;
