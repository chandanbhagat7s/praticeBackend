
// we are going to create review 

const { Schema, default: mongoose } = require("mongoose");

const reviewSchema = new Schema({
    review: {
        type: String,
        required: [true, "review cannot be empty"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    ofTour: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tour'
    },
    byUser: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    rating: {
        type: Number,
        required: [true, "review must have rating"],
        max: 5,
        min: 1
    }
})

reviewSchema.pre(/^find/, function (next) {

    this.populate({
        path: 'byUser',
        select: 'name email '
    })


    next()
})


const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;



















