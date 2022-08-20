const {User, Thought } = require('../models');

module.exports = {

// Get all thoughts
getAllThought(req, res) {
    Thought.find({})
        .populate({ path: 'reactions', select: '-__v'})
        .select('__v')
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
},
// Get a thought by ID
getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.id })
      .select('-__v')
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(500).json(err));
        res.status(404).json({ message: 'No thoguht with that ID' })
        res.json(dbThoughtData)
},
// Post create a new thought
createThought(req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
},
//update a thought by ID
updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true })
    
      .then((dbThoughtData) => {
        if (dbThoughtData) {
          res.status(404).json({ message: 'No course with this id!' });
          return;
        }
          res.json(dbThoughtData)
    })
      .catch((err) => res.status(500).json(err));
},
//delete a thought by ID
deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.courseId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }
        return User.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: req.body },
          { runValidators: true, new: true }
        );
    
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'Thought has been created but no user with ID' });
        }
        res.json({message:'Thought has been deleted !!' });
      })
      .catch((err) => res.json(err));
    
  },
// add reaction 
addReaction(req, res) {
  console.log('You are adding an assignment');
  console.log(req.body);
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $addToSet: { reactions: req.body } },
    { runValidators: true, new: true }
      )
      .then((dbThoughtData) => {
      if (!dbThoughtData) {
          res.status(404).json({ message: 'No thoguht found with that ID :(' })
      return;
      }
      res.json(dbUserData);
    })
      .catch((err) => res.json(err));
  },
//remove reaction
removeReaction(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: {reactions: { reactionId: req.params.reactionId } } },
    { runValidators: true, new: true }
      )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(500).json(err));
  },
};

