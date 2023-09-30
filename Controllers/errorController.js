const AppError = require("../utils/AppError");


function handleDublicateDB(err) {


    return new AppError(`the field with ${err.path} the value is 
    ${err.stringValue} invalid`, 404)

}


function handleValidatorErrorDB(err) {
    let value = Object.values(err.errors).map(el => el.message).join('. ')

    return new AppError(`check the value as per ${value}`, 404)

}


function handlerCaseErrorDB(err) {

    let value = err.message.match(/"(.*?)"/)[0]
    return new AppError(`the field with name ${value} is invalid`, 404)

}




const sendProdError = (err, res) => {
    if (err.isOperational) {
        err.statusCode = err.statusCode || 500;
        err.status = err.status || 'error'
        res.status(err.statusCode).json({
            status: err.status,
            massage: err.message
        })
    } else {
        res.status(500).json({
            status: 'error',
            massage: "Something went wrong"
        })
    }
}
const devProdError = (err, res) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        massage: err.message,
        stack: err.stack
    })
}




module.exports = (err, req, res, next) => {



    if (process.env.NODE_ENV === 'production') {


        // let error = { ...err };
        if (err.code == 11000) {
            err = handleDublicateDB(err)
        } else if (err.name == 'CastError') {
            err = handlerCaseErrorDB(err)
        }
        else if (err.name == 'ValidationError') {
            err = handleValidatorErrorDB(err)
        }
        sendProdError(err, res);
    }
    else {


        devProdError(err, res);
    }
}