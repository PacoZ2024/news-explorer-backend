const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');

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

module.exports = {
  getUsersList,
  getUserInfo,
};
