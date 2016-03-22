var mongoose = require('mongoose');
var placeSchema = require('./place').schema;

var hotelSchema = new mongoose.Schema({
  name: String,
  place: placeSchema,
  num_stars: {
    type: Number,
    min: 1,
    max: 5
  },
  amenities: [String]
});

module.exports = mongoose.model('Hotel', hotelSchema);