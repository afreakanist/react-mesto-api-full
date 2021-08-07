const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const CastError = require('../errors/CastError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ValidationError = require('../errors/ValidationError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => next(new NotFoundError('Пользователь не найден')))
    .then(({
      _id, email, name, about, avatar,
    }) => res.send({
      _id, email, name, about, avatar,
    }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Неправильный запрос'));
      }
      if (err.name === 'ValidationError') {
        next(new CastError('Данные не прошли валидацию'));
      } else {
        next();
      }
    });
};

module.exports.getMyUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      }
      return next(new NotFoundError('Пользователь не найден'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Неправильный запрос'));
      } else {
        next();
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  User.findOne({ email }).then((u) => {
    if (u) {
      throw new ConflictError('Пользователь с таким email уже существует');
    }
    bcrypt.hash(password, 10)
      .then((hash) => User.create({
        name, about, avatar, email, password: hash,
      }))
      .then((user) => res.status(201).send({ _id: user._id, email: user.email }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new ValidationError('Данные не прошли валидацию'));
        } else {
          next();
        }
      });
  }).catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Невозможно авторизоваться');
      }

      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-key', { expiresIn: '7d' });

      res.send({ token });

      /* res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      }).end(); */
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => next(new NotFoundError('Пользователь не найден')))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Данные не прошли валидацию'));
      } if (err.name === 'CastError') {
        next(new CastError('Неправильный запрос'));
      } else {
        next();
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => next(new NotFoundError('Пользователь не найден')))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Данные не прошли валидацию'));
      } if (err.name === 'CastError') {
        next(new CastError('Неправильный запрос'));
      } else {
        next();
      }
    });
};
