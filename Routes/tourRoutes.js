const express = require('express');
// creating router 
const Route = express.Router();
// bringing tourcontroller 
const tourRoute = require('./../Controllers/tourControllers')
// middlewares
const protect = require('../Middleware/protect')
const access = require('../Middleware/access')

// we will bring review route
const reviewRote = require('./../Routes/reviewRoutes')

Route.use('/:tourId/review', reviewRote)

Route.route('/topFiveBestTour').get(tourRoute.aliasTopFive, tourRoute.getAllTour)
Route.route('/getStats').get(tourRoute.tourStats);
Route.route('/').get(tourRoute.getAllTour).post(tourRoute.createTour)
Route.route('/:id').patch(tourRoute.updateTourById).delete(protect.protectRoute, access.giveAccessTo('ADMIN'), tourRoute.deleteTourById).get(tourRoute.getTourById)



module.exports = Route;





