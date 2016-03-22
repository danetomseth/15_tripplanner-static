var router = require('express').Router();
var models = require('../models');
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;

router.get('/', function(req, res, next) {
    Hotel.find().exec()
        .then(function(allHotels) {
            Restaurant.find().exec()
                .then(function(allRestaurants) {
                    Activity.find().exec()
                        .then(function(allActivities) {
                            res.render('index', {
                                hotels: allHotels,
                                restaurants: allRestaurants,
                                activities: allActivities
                            });
                        }, next);
                }, next);
        }, next);
});

router.get('/test', function(req, res, next) {
    res.render('test');
});

module.exports = router;