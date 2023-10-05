const jwt = require("jsonwebtoken")
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const User = require("../Model/User");


exports.protectRoute = catchAsync(async (req, res, next) => {

    // with the help of jwt we will fetch the user from it 
    let token;
    // console.log(req.headers);
    // console.log(req.headers.authorization);
    if (!req.headers.authorization) {
        return next(new AppError("you need to login to perform further task ", 400))
    }

    if (req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]


    }

    // if token is not found 
    if (!token) {
        return next(new AppError("please login to get access", 401));
    }


    // now extracting the user 

    const decode = jwt.verify(token, process.env.SECRET_KEY)
    // console.log(decode);

    // now we got the data which we encoded in the token while creating 

    // checking if user still exists in DB
    const currenUser = await User.findById(decode.id);

    if (!currenUser) {
        return next(new AppError("user do not exist register to get access", 400))
    }

    // checking if pasword status changed or not  
    if (currenUser.chagedPassword(decode.iat)) {
        return next(new AppError("password has changed please login again", 401))
    }




    // embedding the user into the req body
    req.userE = currenUser;













    next()

})

























