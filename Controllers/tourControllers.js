// requring model 
const Tour = require('./../Model/Tour')



exports.getAllTour = async (req, res) => {
    // getting all tour
    // query string is ?.... ok



    console.log(req.query);
    const allTour = await Tour.find({ ...req.query });
    res.status(200).json({
        status: 'success',
        totalResult: allTour.length,
        data: {
            allTour
        }
    })
}

exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create({
            ...req.body
        })



        res.status(200).json({
            status: 'success',
            data: {
                newTour
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'error',
            massage: "unable to crate tour"
        })
    }

}



exports.getTourById = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        if (!tour) {
            res.status(400).json({
                status: 'error',
                massage: "data not found with this id"
            })
        }
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'error',
            massage: "data not found"
        })
    }




}

exports.updateTourById = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, { ...req.body }, {
            runValidators: true,
            new: true
        });
        if (!tour) {
            res.status(400).json({
                status: 'error',
                massage: "data not found"
            })
        }
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'error',
            massage: "data not found"
        })
    }
}

exports.deleteTourById = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: 'success',
            data: null
        })
    } catch (error) {
        res.status(400).json({
            status: 'error',
            massage: "data not found"
        })
    }
}




















