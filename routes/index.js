var router = require('express').Router();
var models = require('../models');
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;
var Promise = require('bluebird');

router.get('/', function (req, res, next) {
  Promise.all([
    Hotel.find().exec(),
    Restaurant.find().exec(),
    Activity.find().exec()
  ])
  .spread(function (allHotels, allRestaurants, allActivities) {
    res.render('index', {
      hotels: allHotels,
      restaurants: allRestaurants,
      activities: allActivities
    });
  })
  .then(null, next);
});

module.exports = router;