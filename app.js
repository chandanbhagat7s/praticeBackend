

const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit')

const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const mongoSanitizer = require('express-mongo-sanitize');


// error class
const AppError = require('./utils/AppError')

//global error controller 
const globalError = require('./Controllers/errorController')
//routes
const tourRoutes = require('./Routes/tourRoutes');
const userRoutes = require('./Routes/userRoutes');

//bunch of methods to app variable 
const app = express();
// app.use()
//conntecting to the DB

// for setting http security headers
app.use(helmet())
app.use(hpp())


// cleaning html code

// mongo satnitize
app.use(mongoSanitizer())

app.use(xss())

// to get the access for req.. body
app.use(express.json({ limit: '10kb' }))
// to get info for request we are making
app.use(morgan('dev'))  //POST / 200 6.252 ms - 13
// we can serve static files even 
app.use(express.static(`${__dirname}/public`))
app.use((req, res, next) => {
    console.log(req.headers);
    next()

})


// to limit no of request 
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from th IP, please try again in an hour!'
});
app.use('/api', limiter);


app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes);


app.all('*', (req, res, next) => {
    // res.status(404).json({
    //     status: "Fail",
    //     msg: `no such ${req.originalUrl} exists`
    // })

    // we will create a error 
    // const err = new Error(`no such ${req.originalUrl} exists`)
    // console.log(typeof err);
    // console.log(err.message);
    // err.statusCode = 404;
    // err.status = 'error'

    // if we are passing any argumnet to the next middleware then it will call automaticaly the global error handler 
    // hear we passed err object 
    // next(err)

    // we will create our own error class
    next(new AppError(`no such ${req.originalUrl} exists`, 404))
})

// global error handling 
app.use(globalError)

// creating the server to listen 
module.exports = app;































