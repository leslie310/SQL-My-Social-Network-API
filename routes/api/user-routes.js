const router = require('express').Router();
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/user-controller');

// /api/users
router.route('/').get(getAllUser).post(createUser);

// /api/users/:Id
router.route('/:Id').get(getUserById).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends
router.route('/:userId/friends/:friendIs').post(addFriend).delete(removeFriend);

module.exports = router;
