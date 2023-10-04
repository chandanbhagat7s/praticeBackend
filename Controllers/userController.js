
// we need model to perform crud operation 

const User = require("../Model/User");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

const updateOnly = (obj, ...fields) => {
    let update = {};
    Object.keys(obj).forEach(el => {
        if (fields.includes(el)) {
            update[el] = obj[el];
        }
    })
    return update;
}

exports.updateMe = catchAsync(async (req, res, next) => {
    const id = req.userE._id;
    if (req.body.password || req.body.Cnfpassword) {
        return next(new AppError("this is not the route for updating password ", 400));
    }

    const obj = updateOnly(req.body, 'name', 'email')
    const user = await User.findByIdAndUpdate(id, obj, {
        new: true,
        runValidators: true

    })
    res.status(200).json({
        status: "success",
        user
    })

})

// route for deleting the user 
exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.userE.id, { active: false });

    res.status(200).json({
        status: "success",
        message: "you are out now "
    })
})


























