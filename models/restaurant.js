var mongoose = require('mongoose');
var placeSchema = require('./place').schema;

var restaurantSchema = new mongoose.Schema({
  name: String,
  place: placeSchema,
  cuisine: String,
  price: {
    type: Number,
    min: 1,
    max: 5
  }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);