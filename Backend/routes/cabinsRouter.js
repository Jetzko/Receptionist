const express = require('express');
const router = express.Router();

const {
  getAllCabins,
  getCabin,
  createCabin,
  updateCabin,
  deleteCabin,
} = require('../controllers/cabinsController');

// get all
router.get('/', getAllCabins);

// get
router.get('/:id', getCabin);

// post
router.post('/', createCabin);

// patch
router.patch('/:id', updateCabin);

// delete
router.delete('/:id', deleteCabin);

module.exports = router;
