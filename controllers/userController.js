const User =require('../models/user');

module.exports = {
//Get all users
  getUsers(req,res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
},
//Get User by ID
    getUserById(req, res) {
      User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('thoughts')
      .then((user) =>
          !user
              ? res.status(404).json({ msg: 'No user with that ID' })
              : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
},
//create user 
    createUser(req, res) {
      User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
},
// update user by ID
    updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true })
    
      .then((user) =>
          !user
              ? res.status(404).json({ msg: 'No user with this ID' })    
              : res.json(user)
        )
      .catch((err) => res.status(500).json(err))
    },
// delete user by ID
    deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
    .then((user) =>
    !user
        ? res.status(404).json({ msg: 'No user with that ID' })
        : Thought.deleteMany({ _id: { $in: user.thoughts }})
)
.then((user) =>
    !user
        ? res.status(404).json({ msg: 'not deleted' })
        : res.json({ msg: ' successfully deleted' })
)
.catch((err) => {
    console.log(err);
    res.status(500).json(err)
})
},
  //add friend to list
    addFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body } },
        { runValidators: true, new: true }
       ) 
       .then((user) =>
            !user
                ? res.status(404).json({ msg: 'No user with this ID' }) 
                : res.json(user)
       )
       .catch((err) => res.status(500).json(err))
    },
  // remove friend 
    removeFriend(req, res) {
      User.findOneAndUpdate( 
        { _id: req.params.userId },
        { $pull: { friends: { userId: req.params.friendId }}},
        { runValidators: true, new: true }
    )
    .then((user) =>
        !user
            ? res.status(404).json({ msg: "No friend with this ID" })
            : res.json(user)
    )
    .catch((err) => res.status(500).json(err))
}
};