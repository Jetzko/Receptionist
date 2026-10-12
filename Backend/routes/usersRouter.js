const express = require('express');
const {
  signup,
  login,
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

usersRouter.use(requireAuth);
usersRouter.get('/:id', getUser);
usersRouter.patch('/:id', updateUser);
usersRouter.delete('/:id', deleteUser);

module.exports = usersRouter;
