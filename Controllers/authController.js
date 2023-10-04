
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const User = require('./../Model/User');
const jwt = require('jsonwebtoken');

const bcrypt = require("bcryptjs")

const crypto = require('crypto');
const sendMail = require('./../utils/sendEmail');


const createTokenSendResponse = (id, res, statusCode, message) => {

    // we will set the cookie which browser will save it automatticaly and send it in each request made by user furter automaticaly 




    let token = jwt.sign({ id }, process.env.SECRET_KEY, {

        expiresIn: process.env.EXPIRES_IN
    })
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    res.cookie('jwt', token, cookieOptions);
    res.status(statusCode).json({
        status: 'success',
        message

    })
}


exports.createUser = catchAsync(async (req, res, next) => {
    const { name, email, password, passwordChanged } = req.body;
    const newUser = await User.create({
        name, email, password, passwordChanged
    });

    if (!newUser) {
        return next(new AppError("please try again later"))
    }
    newUser.password = undefined;
    // we need to genrate jwt token 
    createTokenSendResponse(newUser._id, res, 201, newUser)


});


exports.login = catchAsync(async (req, res, next) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError("please Enter email and password both ", 400));
    }

    const user = await User.findOne({ email }).select('+password')
    console.log(user);

    if (!user || ! await user.correctPass(password, user.password)) {
        return next(new AppError("please check your email and passord", 400))
    }

    createTokenSendResponse(user._id, res, 200, "you are logged in")








})



exports.forgotPassword = catchAsync(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(new AppError("please enter your mail address with which u have registered", 400));
    }

    const resetToken = user.createPasswordResetToken();


    await user.save({ validateBeforeSave: false });

    // we will try to send mail and at the same time we need to handle the error and rever the change in DB
    try {
        let message = `we have send the mail to ${user.email} reset the password , refer this url ${req.protocol}://${req.hostname}/api/v1/forgotPassword/${resetToken}`;
        const option = {
            to: user.email,
            sub: "forgot password ",
            message
        }
        await sendMail(option)
    } catch (error) {
        // console.log(error);
        user.passwordExpires = undefined;
        user.passwordRestToken = undefined;
        await user.save();
        return next(new AppError("please try to change the password after some time", 404))
    }
    res.status(200).json({
        status: 'success',
        message: "email sent"

    })
})

exports.resetPassword = catchAsync(async (req, res, next) => {
    //  we will get the token in request and then we can find the user onit 
    let token = req.params.token;
    // we need to encrypt it again and find the match in the database 
    token = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({ passwordRestToken: token, passwordExpires: { $gt: Date.now() } });
    if (!user) {
        return next(new AppError("invalid token or token expired", 404));
    }

    // now we need to set the password for the user and genrate its jwt 

    user.password = req.body.password;
    user.Cnfpassword = req.body.Cnfpassword;
    user.passwordRestToken = undefined;
    user.passwordExpires = undefined;

    await user.save();
    createTokenSendResponse(user._id, res, 200, "your password is set !!")


})


exports.changePassword = catchAsync(async (req, res, next) => {

    const user = await User.findById(req.userE._id).select('+password');
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const Cnfpassword = req.body.Cnfpassword;

    if (!await user.correctPass(oldPassword, user.password)) {
        return next(new AppError("you entred wrong old password"));

    }

    user.password = newPassword;
    user.Cnfpassword = Cnfpassword;
    await user.save()
    createTokenSendResponse(user._id, res, 200, "you have chaged password succesfully ")












})















