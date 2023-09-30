

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

// error class
const AppError = require('./utils/AppError')

//global error controller 
const globalError = require('./Controllers/errorController')
//routes
const tourRoutes = require('./Routes/tourRoutes');

//bunch of methods to app variable 
const app = express();
// app.use()
//conntecting to the DB




// to get the access for req.. body
app.use(express.json())
// to get info for request we are making
app.use(morgan('dev'))  //POST / 200 6.252 ms - 13
// we can serve static files even 
app.use(express.static(`${__dirname}/public`))


app.use('/api/v1/tours', tourRoutes);


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































