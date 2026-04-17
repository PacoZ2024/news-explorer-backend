const mongoose = require('mongoose');
const validator = require('validator');

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

module.exports = mongoose.model('user', userSchema);
