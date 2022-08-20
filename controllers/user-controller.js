const {User, Thought } =require('../models');

module.exports = {
//Get all users
    getAllUser(req,res) {
        User.find({})
        .populate({ path: 'friends', select: '-__v'})
        .select('__v')
        .sort({_id: -1})
        .then((dbUserData) => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
},
//Get User by ID
    getUserById(req, res) {
    User.findOne({ _id: req.params.id })
        .populate({ path: 'thoughts', select: '-__v'})
        .select('-__v')
        .populate({ path: 'friends', select: '-__v'})
        .select('-__v')
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(500).json(err));
            res.status(404).json({ message: 'No User with that ID' })
            res.json(dbUserData)
},
//create user 
    createUser(req, res) {
    User.create(req.body)
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
},
// update user by ID
    updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true })
    
        .then((dbUserData) => {
        if (dbUserData) {
          res.status(404).json({ message: 'No User with this id!' });
          return;
        }
          res.json(dbUserData)
    })
      .catch((err) => res.status(500).json(err));
},
// delete user by ID
    deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.courseId })
        .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user with that ID' });
        }
        return Thought.deleteMany(
          { _id: req.params },
          { $in: dbUserData.thoughts},
         
        );
    
      })
        .then(() => {
         res.status(404).json({ message: 'users associaed thoughts deleted' });
        })
        .catch((err) => res.json(err));
    
  },
  //add friend to list
    addFriend(req, res) {
    console.log('You are adding an assignment');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body } },
      { runValidators: true, new: true }
        )
        .then((dbUserData) => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with that ID :(' })
        return;
        }
        res.json(dbUserData);
      })
        .catch((err) => res.json(err));
  },
  // remove friend 
    removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.friendId },
      { $pull: {friends: { friendId: req.params.friendId } } },
      { runValidators: true, new: true }
        )
        .then((User) =>
        !User
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(dbUserData)
      )
      .catch((err) => res.status(500).json(err));
  },
}