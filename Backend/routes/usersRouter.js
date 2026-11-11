const express = require('express');
const {
  signup,
  login,
  getUser,
  getAllUsers,
  getUserByNickname,
  updateUser,
  deleteUser,
} = require('../controllers/usersController');
const requireAuth = require('../middlewares/requireAuth');

const usersRouter = express.Router();

usersRouter.post('/signup', signup);
usersRouter.post('/login', login);

usersRouter.use(requireAuth);

usersRouter.get('/required/:id', getAllUsers);
usersRouter.get('/:id', getUser);
usersRouter.patch('/:id', updateUser);
usersRouter.delete('/:id', deleteUser);
usersRouter.get('/nickname/:nickname', getUserByNickname);

module.exports = usersRouter;
