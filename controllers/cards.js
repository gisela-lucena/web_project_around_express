import { Card } from '../models/cards.js';

export const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.json(cards);
  } catch (err) {
    next(err);
  }
};

export const createCard = async (req, res, next) => {
 try {
  const { name, link } = req.body;
  const owner = req.user._id;

  const card = await Card.create({ name, link, owner });
  res.status(201).json(card);
 } catch (err) {
    next(err);
 }
};

export const deleteCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;

    const card = await Card.findById(cardId).orFail();
    await card.deleteOne();
    res.json({ message: 'Cartão deletado' });
  } catch (err) {
    next(err);
  }};

  export const likeCard = async (req, res, next) => {
    try {
      const { cardId } = req.params;

      const card = await Card.findByIdAndUpdate(
        cardId,
        { $addToSet: { likes: req.user._id } },
        { new: true }
      ).orFail();
      res.json(card);
    } catch (err) {
      next(err);
    } };

  export const dislikeCard = async (req, res, next) => {
    try {
      const { cardId } = req.params;
      const card = await Card.findByIdAndUpdate(
        cardId,
        { $pull: { likes: req.user._id } },
        { new: true }
      ).orFail();
      res.json(card);
    } catch (err) {
      next(err);
    } };
