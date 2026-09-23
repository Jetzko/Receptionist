const express = require('express');
const {
  signup,
  login,
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require('../controllers/usersController');
const requireAuth = require('../middlewares/requireAuth');

const usersRouter = express.Router();

usersRouter.post('/signup', signup);
usersRouter.post('/login', login);
usersRouter.get('/', getAllUsers);
usersRouter.get('/:id', getUser);

usersRouter.use(requireAuth);
usersRouter.patch('/:id', updateUser);
usersRouter.delete('/:id', deleteUser);

module.exports = usersRouter;
