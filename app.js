const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const wrongRouter = require('./routes/wrong');
const { login, createUser } = require('./controllers/user');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
});
const { PORT = 3000 } = process.env;
const app = express();
app.use(helmet());
app.use(limiter);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT);
app.use(express.static(path.join(__dirname, 'public')));

app.post('/signin', login);
app.post('/signup', createUser);
app.use('/cards', cardsRouter);
app.use('/users', usersRouter);
app.use('/*', wrongRouter);
