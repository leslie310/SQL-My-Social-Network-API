
const users = [
    {
        username: 'Leslie15',
        email: 'lesles@leslie.com'
    },
    {
        username: 'josh13',
        email: 'josh125@josh.com'
    },
    {
        username: 'Chris',
        email: 'chris145@chris.com'
    }
];

const thoughts = [
    {
        thoughtText: "This is a thought.",
	    username: "Leslie"
    },
    {
        thoughtText: "I love coffee",
	    username: "Leslie"
    },
    {
        thoughtText: 'Can it be friday ?',
	    username: "josh13"
    },
    {
        thoughtText: 'I need to go buy shoes.',
	    username: "josh13"
    },
    {
        thoughtText: 'Cant wait to go for a run',
	    username: "Chris"
    },
    {
        thoughtText: 'Need to go study',
	    username: "Chris"
    },
 
];
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

module.exports = { users,thoughts};