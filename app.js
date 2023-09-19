

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

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


// creating the server to listen 
module.exports = app;































