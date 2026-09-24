const Cabin = require('../../models/cabinModel');

const createCabin = async (req, res) => {
  const {
    name,
    price,
    address,
    description = '',
    status = '',
    reviews = '',
    rating = '',
  } = req.body;

  let emptyFields = [];
  if (!name) emptyFields.push('name');
  if (!price) emptyFields.push('price');
  if (!address) emptyFields.push('address');

  if (emptyFields.length > 0)
    return res
      .status(400)
      .json({ error: 'Plaese compile all requested fields.' });

  try {
    const owner_id = req.user._id.toString();
    const cabin = await Cabin.create({
      name,
      price,
      address,
      status,
      description,
      users: {
        owner_id,
      },
      reviews,
      rating,
    });
    res.status(200).json(cabin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createCabin };
