const express = require('express');
// creating router 
const Route = express.Router();
// bringing tourcontroller 
const tourRoute = require('./../Controllers/tourControllers')


Route.route('/topFiveBestTour').get(tourRoute.aliasTopFive, tourRoute.getAllTour)
Route.route('/getStats').get(tourRoute.tourStats);
Route.route('/').get(tourRoute.getAllTour).post(tourRoute.createTour)
Route.route('/:id').patch(tourRoute.updateTourById).delete(tourRoute.deleteTourById).get(tourRoute.getTourById)



module.exports = Route;





