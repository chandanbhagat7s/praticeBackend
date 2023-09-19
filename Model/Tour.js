
const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "the tour must have name"],
        unique: true
    },
    price: {
        type: Number,
        required: [true, "the tour must have price"]
    },
    ratingsAverage: {
        type: Number,
        default: 4.5
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },

    images: [String],
    imageCover: {
        type: String,
        required: [true, "the tour must have cover-image"]
    },
    summary: String,
    description: {
        type: String,
        required: [true, "the tour must have discription "]
    },
    difficulty: {
        type: String,
        required: [true, "the tour must have difficulty level"]
    },
    duration: {
        type: String,
        required: [true, "the tour must have duration"]
    },
    maxGroupSize: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    startDates: [Date]

})

// creating model of it 
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;














