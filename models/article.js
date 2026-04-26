const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, 'Se requiere el tema del artículo'],
  },
  title: {
    type: String,
    required: [true, 'Se requiere el título del artículo'],
  },
  description: {
    type: String,
    required: [true, 'Se requiere la descripción del artículo'],
  },
  date: {
    type: String,
    required: [true, 'Se requiere la fecha de publicación del artículo'],
  },
  source: {
    type: String,
    required: [true, 'Se requiere la fuente del artículo'],
  },
  url: {
    type: String,
    required: [true, 'Se requiere el vínculo del artículo'],
    validate: {
      validator: validator.isURL,
      message: (props) => `La dirección ${props.value} no es de una URL válida`,
    },
  },
  urlToImage: {
    type: String,
    required: [true, 'Se requiere la imagen del artículo'],
    validate: {
      validator: validator.isURL,
      message: (props) => `La dirección ${props.value} no es de una URL válida`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Se requiere un usuario como propietario de la tarjeta'],
  },
});

module.exports = mongoose.model('article', articleSchema);
