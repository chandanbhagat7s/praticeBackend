

const express = require('express');

const Router = express.Router({ mergeParams: true });

const reviewRoute = require('./../Controllers/reviewController');

const protect = require('./../Middleware/protect');
const { giveAccessTo } = require('../Middleware/access');

// routing is comeming from tour so we need param
// this review is on tour so we will be bringing from their 

//post
// /tourId/review
// /review
Router.route('/').get(reviewRoute.getAllReviews).post(protect.protectRoute, giveAccessTo('USER'), reviewRoute.createReview)



// Router.get('/getAllReviews', reviewRoute.getAllReviews);
// Router.post('/createReview', reviewRoute.createReview);
// Router.route('/createReview/:id').post(reviewRoute.createReview)

Router.route('/').get(reviewRoute.getAllReviews)





module.exports = Router;















