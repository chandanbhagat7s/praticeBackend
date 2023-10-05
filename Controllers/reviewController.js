const Review = require("../Model/Review");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.getAllReviews = catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.tourId) {
        filter = { ofTour: req.params.tourId }
    }
    console.log("came in get");
    const allReviews = await Review.find(filter);

    res.status(200).json({
        status: "success",
        allReviews
    })




})

exports.createReview = catchAsync(async (req, res, next) => {

    if (!req.body.byUser) {
        req.body.byUser = req.userE;
    }
    if (!req.body.ofTour) {
        req.body.ofTour = req.params.tourId
    }
    const review = await Review.create({
        review: req.body.review,
        rating: req.body.rating,
        byUser: req.body.byUser,
        ofTour: req.body.ofTour
    });

    if (!review) {
        return next(new AppError("review not created"));
    }


    res.status(200).json({
        status: "success",
        review
    })



})




















