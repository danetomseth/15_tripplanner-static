var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tripplanner');
mongoose.connection.on('error', function (err) {
  console.error('Database connection error');
  console.error(err);
});

module.exports = {
  Place: require('./place'),
  Hotel: require('./hotel'),
  Activity: require('./activity'),
  Restaurant: require('./restaurant')
};