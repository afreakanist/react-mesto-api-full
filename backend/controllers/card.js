const Card = require('../models/card');
const CastError = require('../errors/CastError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: { _id: req.user._id } })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Данные не прошли валидацию'));
      } else {
        next();
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка не найдена'));
      }
      if (card.owner._id.toString() !== req.user._id) {
        next(new ForbiddenError('Удалять можно только свои карточки'));
      } else {
        Card.deleteOne({ _id: cardId })
          .then((c) => res.status(200).send({ message: `Карточка ${cardId} была удалена`, ...c }))
          .catch((err) => {
            if (err.name === 'CastError') {
              next(new CastError('Неправильный запрос'));
            } else {
              next();
            }
          });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Неправильный запрос'));
      } else {
        next();
      }
    });
};

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
).orFail(() => next(new NotFoundError('Карточка не найдена')))
  .then((card) => res.send(card))
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new CastError('Неправильный запрос'));
    } else {
      next();
    }
  });

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
).orFail(() => next(new NotFoundError('Карточка не найдена')))
  .then((card) => res.send(card))
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new CastError('Неправильный запрос'));
    } else {
      next();
    }
  });
