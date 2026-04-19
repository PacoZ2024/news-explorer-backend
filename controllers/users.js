require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');

async function getUsersList(req, res, next) {
  await User.find({})
    .then((users) => res.send(users))
    .catch(next);
}

async function getUserInfo(req, res, next) {
  const currentUserId = req.user._id;
  await User.findById(currentUserId)
    .orFail(() => {
      throw new NotFoundError('Usuario no encontrado');
    })
    .then((user) => res.status(200).send(user))
    .catch(next);
}

async function createUser(req, res, next) {
  const { username, email, password } = req.body;
  if (!password) throw new BadRequestError('Se requiere una contraseña');

  if (password.length < 8) {
    throw new BadRequestError(
      'La longitud mínima de la contraseña debe ser de al menos ocho caracteres',
    );
  }

  await bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ username, email, password: hash }))
    .then((user) => res.status(201).send({
      username: user.username,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(err.message);
      }
      next(err);
    })
    .catch(next);
}

async function login(req, res, next) {
  const { email, password } = req.body;
  await User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
        {
          expiresIn: '7d',
        },
      );
      res.send({ token });
    })
    .catch(next);
}

module.exports = {
  getUsersList,
  getUserInfo,
  createUser,
  login,
};
