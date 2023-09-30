// requring model 

const Tour = require('./../Model/Tour')
const FeatureAPI = require('./../utils/featureAPI')

// catchAsync : catching async errors
const catchAsync = require('./../utils/catchAsync')
const AppError = require('../utils/AppError')


// for top five tour
// just we are filling the query for the user by creating the route
exports.aliasTopFive = (req, res, next) => {
    req.query.sort = '-price,-ratingsAverage'
    req.query.limit = 5;
    req.query.fields = 'name,difficulty,ratingsAverage,price,summery';
    next();
}


exports.tourStats = catchAsync(async (req, res, next) => {

    const stats = await Tour.aggregate([
        {
            $match: { price: { $gte: 1500 } }
        },
        {
            $group: {
                _id: null,
                max_price_tour: { $max: '$price' },
                avg_price: { $avg: '$price' }
            }
        }
    ])
    res.status(200).json({
        status: "success",
        stats
    })








})





exports.getAllTour = catchAsync(async (req, res, next) => {

    // getting all tour
    // query string is ?.... ok



    // const reqObj = { ...req.query };
    // console.log(req.query);
    // const remove = ['page', 'limit', 'sort', , 'fields']
    // remove.forEach(el => {
    //     delete reqObj[el]
    // })

    // //advance filtering 
    // let queryStr = JSON.stringify(reqObj);
    // queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)


    // q = Tour.find(JSON.parse(queryStr));
    // console.log(q);
    // if (req.query.sort) {
    //     console.log(req.query);
    //     // { difficulty: 'easy', sort: 'price,ratingsAverage' }
    //     // console.log(req.query.difficulty);
    //     // let str = JSON.stringify(req.query.sort)
    //     str = req.query.sort.split(',').join(" ");
    //     console.log(str);
    //     q = q.sort(str)
    //     console.log(req.query);
    //     // { difficulty: 'easy', sort: 'price ratingsAverage' }

    // }

    // if (req.query.fields) {
    //     let str = req.query.fields.split(',').join(" ");
    //     q = q.select(str);
    // } else {
    //     q = q.select('-__v')
    // }

    //PAGINATION
    // let page = req.query.page * 1 || 1;
    // let limit = req.query.limit * 1 || 5;
    // let skip = (page - 1) * limit
    // q = q.skip(skip).limit(limit)




    //sorting
    // if (req.query.sort) {
    //     console.log(q);
    // }



    // using feature api 
    const features = new FeatureAPI(Tour.find(), req.query).filter().sort().fields().pagination();


    const allTour = await features.query;
    res.status(200).json({
        status: 'success',
        totalResult: allTour.length,
        data: {
            allTour
        }
    })

})

exports.createTour = catchAsync(async (req, res, next) => {

    const newTour = await Tour.create({
        ...req.body
    })



    res.status(200).json({
        status: 'success',
        data: {
            newTour
        }
    })


})



exports.getTourById = catchAsync(async (req, res, next) => {

    const tour = await Tour.findById(req.params.id);

    if (!tour) {
        return next(new AppError('no tour with this id', 404))
    }
    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })





})

exports.updateTourById = catchAsync(async (req, res, next) => {

    const tour = await Tour.findByIdAndUpdate(req.params.id, { ...req.body }, {
        runValidators: true,
        new: true
    });
    if (!tour) {
        return next(new AppError('no tour with this id', 404))
    }
    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })

})

exports.deleteTourById = catchAsync(async (req, res, next) => {

    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) {
        return next(new AppError('no tour with this id', 404))
    }
    res.status(200).json({
        status: 'success',
        data: null
    })

})




















