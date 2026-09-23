const express = require('express');
const cabinsRouter = express.Router();

const requireAuth = require('../middlewares/requireAuth');

const { getAllCabins, getCabin } = require('../controllers/cabins/getCabins');
const { createCabin } = require('../controllers/cabins/createCabin');
const { updateCabin } = require('../controllers/cabins/updateCabin');
const { deleteCabin } = require('../controllers/cabins/deleteCabin');

cabinsRouter.get('/', getAllCabins);
cabinsRouter.get('/:id', getCabin);

cabinsRouter.use(requireAuth);

cabinsRouter.post('/', createCabin);
cabinsRouter.patch('/:cabin_id', updateCabin);
cabinsRouter.delete('/:id', deleteCabin);

module.exports = cabinsRouter;
