const { connect, connection } = require('mongoose');

connect('mongodb://localhost/sql-my-social-network-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;

