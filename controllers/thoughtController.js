const {Thought, User } = require('../models');

module.exports = {

// Get all thoughts
getThoughts(req, res) {
  Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
},
// Get a thought by ID
getThoughtById(req, res) {
  Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
          !thought
              ? res.status(404).json({ msg: 'No thought with that ID' })
              : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
},
// Post create a new thought
createThought(req, res) {
  Thought.create(req.body)
    .then((thought) => {
      return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id }},
          { new: true }
      );
  })
  .then((user) =>
      !user
          ? res.status(404).json({
              msg: 'Thought created, no user with that ID'
          })
          : res.json('Thought created!')
  )
  .catch((err) => res.status(500).json(err))
},
//update a thought by ID
updateThought(req, res) {
  Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
      )
      .then((thought) => 
          !thought
              ? res.status(404).json({ msg: 'No course with this ID!' })
              : res.json(thought)
      )
  .catch((err) => res.status(500).json(err))
},
//delete a thought by ID
deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => 
        !thought
                    ? res.status(404).json({ msg: 'No thought with that ID' }) 
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId }},
                        { new: true }
                    )
            )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ msg: 'Thought deleted but no user found' })
                    : res.json({ msg: 'Thought successfully deleted' })
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            })
    },
// add reaction 
addReaction(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $addToSet: { reaction: req.body }},
    { runValidators: true, new: true }
)
.then((thought) =>
    !thought
        ? res.status(404).json({ msg: 'No thought with this ID'})
        : res.json(thought)
)
.catch((err) => res.status(500).json(err));
},
//remove reaction
removeReaction(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: {reactions: { reactionId: req.params.reactionId } } },
    { runValidators: true, new: true }
      )
      .then((thought) =>
      !thought
          ? res.status(404).json({ msg: 'No reaction with this ID' })
          : res.json(thought)
  )
  .catch((err) => res.status(500).json(err))
}
};
