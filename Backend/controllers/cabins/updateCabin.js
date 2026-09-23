const mongoose = require('mongoose');
const Cabin = require('../../models/cabinModel');
const User = require('../../models/userModel');

const validateUserIds = (userIds) => {
  return userIds.every((userId) => mongoose.Types.ObjectId.isValid(userId));
};

const checkUserExist = async (userIds) => {
  // 1. Cerca tra gli utenti nel db quelli con id uguale a quello degli utenti aggiunti nella richiesta
  const existingUsers = await User.find({
    _id: { $in: userIds },
  }).select('_id');

  // 2. confronta il numero di ID unici trovati nel db con quello degli ID unici nella richiesta, se ilnumero è diverso qualche id nella richiesta non esiste
  return existingUsers.length === new Set(userIds).size;
};

const findEditableCabin = async (cabinId, activeUserId) => {
  return await Cabin.findOne({
    // Cerca una cabin con l'ID della cabin nella richiesta e che abbia tra owner e admins l'ID dell'utente che esegue la richiesta
    _id: cabinId,
    $or: [
      { 'users.owner_id': activeUserId },
      { 'users.admins_id': activeUserId },
    ],
  });
};

const buildUpdatableData = ({ body, isOwner }) => {
  const { users = {} } = body;
  const allowedFields = ['name', 'price', 'address', 'status', 'description'];

  const updateData = Object.fromEntries(
    Object.entries(body).filter(
      ([key, value]) => allowedFields.includes(key) && value !== undefined,
    ),
  );

  if (isOwner && users.admins_id !== undefined) {
    updateData['users.admins_id'] = users.admins_id;
  }

  if (users.collaborators_id !== undefined) {
    updateData['users.collaborators_id'] = users.collaborators_id;
  }

  return updateData;
};

const updateCabin = async (req, res) => {
  const { cabin_id } = req.params;
  const { users = {} } = req.body;
  const { admins_id = [], collaborators_id = [] } = users;
  const activeUser_id = req.user._id.toString();

  if (!mongoose.Types.ObjectId.isValid(cabin_id)) {
    return res.status(400).json({ error: 'Cabin ID not valid' });
  }

  // if (!Array.isArray(admins_id) || !Array.isArray(collaborators_id)) {
  //   return res.status(400).json({
  //     error: 'admins_id and collaborators_id must be arrays.',
  //   });
  // }

  try {
    const cabin = await findEditableCabin(cabin_id, activeUser_id);

    if (!cabin)
      return res
        .status(404)
        .json({ error: 'Cabin not found or you have not the permissions.' });

    const isOwner = cabin.users.owner_id === activeUser_id;

    const userIdsToCheck = isOwner
      ? [...admins_id, ...collaborators_id]
      : collaborators_id;

    if (!validateUserIds(userIdsToCheck))
      return res.status(400).json({
        error: 'One or more user IDs are not valid.',
      });

    if (!(await checkUserExist(userIdsToCheck)))
      return res.status(404).json({ error: 'One or more user do not exist.' });

    const updateData = buildUpdatableData({
      body: req.body,
      isOwner,
    });

    const updatedCabin = await Cabin.findByIdAndUpdate(
      // trova la cabin con questo
      cabin_id,
      { $set: updateData },
      { new: true, runValidators: true },
    );

    res.status(200).json(updatedCabin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { updateCabin };
