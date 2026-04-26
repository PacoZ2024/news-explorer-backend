const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/unauthorized-err');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Se requiere el nombre de usuario'],
    minlength: [
      2,
      'La longitud mínima del nombre de usuario es de dos caracteres',
    ],
    maxlength: [
      30,
      'La longitud máxima del nombre de usuario es de 30 caracteres',
    ],
  },
  email: {
    type: String,
    required: [true, 'Se requiere el correo electrónico del usuario'],
    unique: [true, 'Ya existe un usuario con ese correo electrónico'],
    validate: {
      validator: validator.isEmail,
      message: 'Correo electrónico inválido',
    },
  },
  password: {
    type: String,
    select: false,
    required: [true, 'Se requiere una contraseña'],
    minlength: [8, 'La longitud mínima de la contraseña es de ocho caracteres'],
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select('+password')
    .orFail(() => {
      throw new UnauthorizedError('Contraseña o correo electrónico incorrecto');
    })
    .then((user) => bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        throw new UnauthorizedError(
          'Contraseña o correo electrónico incorrecto',
        );
      }
      return user;
    }));
};

module.exports = mongoose.model('user', userSchema);
