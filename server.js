const app = require('./app');
const express = require('express');
const dotenv = require('dotenv'); const mongoose = require('mongoose');

// to use env variable 
app.use(express.json())
dotenv.config({ path: './config.env' })
// console.log(process.env);
console.log(process.env.NODE_ENV);

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("database connected");
}).catch(err => {
    console.log("failed to connect ", err);
})
//creating the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("your server started at port : ", port);
})






