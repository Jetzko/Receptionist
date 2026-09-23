const mongoose = require('mongoose');

const Cabin = require('../../models/cabinModel');

const deleteCabin = async (req, res) => {
  const { id } = req.params;
  const activeUser_id = req.user._id.toString();

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: 'ID not valid' });

  try {
    const cabin = await Cabin.findOneAndDelete({
      _id: id,
      'users.owner_id': activeUser_id,
    });

    if (!cabin) {
      return res.status(404).json({
        error: 'Cabin not found or you have not the permissions.',
      });
    }

    res.status(200).json(cabin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { deleteCabin };
