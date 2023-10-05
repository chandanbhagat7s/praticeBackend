
const mongoose = require('mongoose');
const slugify = require('slugify');
// const User = require('./User');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "the tour must have name"],
        unique: true,
        trim: true,
        maxlength: [40, 'name cannot excced then 40 char..'],
        minlength: [3, 'name must have aleast 3 character..']
    },
    price: {
        type: Number,
        required: [true, "the tour must have price"]
    },
    slug: String,
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must have above 0 or 1'],
        max: [5, 'Rating cannot exceed more than 5']
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
        required: [true, "the tour must have difficulty level"],
        enum: {
            values: ['easy', 'difficult', 'medium'],
            message: 'Difficulty must be easy medium or deficult only '
        }
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
    startDates: [Date],
    startLocation: {
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']

        },
        coordinates: [Number],
        address: String,
        description: String

    },
    locations: [
        {
            type: {
                type: String,
                default: 'Point',
                enum: ['Point'],
            },
            coordinates: [Number],
            description: String
        }
    ],
    // for EMBEDDING 
    // guides: {

    //     // type: [String]
    //     // type: Array

    // }

    // for REFRENCING
    guides: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ],
    // we want the reviews on each tour , but if we do child referncing then it will be grown large array 
    // we will user  virtual populate
    // reviews: [
    //     {
    //         type: mongoose.Schema.ObjectId,
    //         ref: 'Review'
    //     }
    // ]

},
    //options for virtual props
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)
// creating virtual props
tourSchema.virtual('durationInWeeks').get(function () {
    return this.duration / 7;
})

// we need to do virtual populate
tourSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: "ofTour",
    localField: "_id"
})




// documnet middleware/hook:work for creaate and save doc..
tourSchema.pre('save', function (next) {
    this.slug = slugify(this.name);
    next()
})


// we are embedding the data while creating okk JUST FOR LEARING INCASE WE NEED
// tourSchema.pre('save', async function (next) {
//     const promises = this.guides.map(async id => await User.findById(id));
//     this.guides = await Promise.all(promises);

//     next()
// })



//QUERY MIDDLEWARE

tourSchema.pre(/^find/, function (next) {
    this.populate({ path: 'guides', select: '-__v -passwordRestToken -passwordExpires' })
    next()
})



//AGGRIGATION MIDDLEWARE


// creating model of it 
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;














