const express = require('express');
const cabinsRouter = express.Router();

const {
  getAllCabins,
  getCabin,
  createCabin,
  updateCabin,
  deleteCabin,
} = require('../controllers/cabinsController');

// get all
cabinsRouter.get('/', getAllCabins);

// get
cabinsRouter.get('/:id', getCabin);

// post
cabinsRouter.post('/', createCabin);

// patch
cabinsRouter.patch('/:id', updateCabin);

// delete
cabinsRouter.delete('/:id', deleteCabin);

module.exports = cabinsRouter;
