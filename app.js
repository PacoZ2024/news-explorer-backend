const express = require('express');
const { createUser, login } = require('./controllers/users');
const auth = require('./middleware/auth');
const usersRoutes = require('./routes/users');
const articlesRoutes = require('./routes/articles');
const NotFoundError = require('./errors/not-found-err');
const { validateUser, validateLogin } = require('./middleware/validation');

const { PORT = 3000 } = process.env;
const app = express();

app.post('/signin', validateLogin, login);
app.post('/signup', validateUser, createUser);
app.use('/users', auth, usersRoutes);
app.use('/articles', auth, articlesRoutes);
app.use('/', () => {
  throw new NotFoundError('Recurso solicitado no encontrado');
});

app.listen(PORT, () => {
  console.log(`Servidor encendido en el puerto ${PORT}`);
});
