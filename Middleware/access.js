const AppError = require("../utils/AppError")

exports.giveAccessTo = function (...role) {
    return (req, res, next) => {
        if (!role.includes(req.userE.role)) {
            return next(new AppError("you are not authorized to perform this task", 403));
        }
        next()
    }
}
















