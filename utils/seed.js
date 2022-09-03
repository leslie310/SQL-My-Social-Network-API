const connection = require('../config/connection');
const { User, Thought } = require('../models');
const {
    users,
    thoughts
} = require('./data');

// console.time('seeding');

connection.once('open', async () => {
    await User.deleteMany({});
    await Thought.deleteMany({});


    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);

    console.table(users);
    console.table(thoughts);
    // console.timeEnd('Seeding complete 🌱!');
    process.exit(0);
})