const usersRouter = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getAllUsers, getUser, renewUser, renewUserAvatar,
} = require('../controllers/user');

usersRouter.get('/:id', auth, getUser);

usersRouter.get('/', auth, getAllUsers);

usersRouter.patch('/me', auth, renewUser);

usersRouter.patch('/me/avatar', auth, renewUserAvatar);

module.exports = usersRouter;
