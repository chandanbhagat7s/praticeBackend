const mongoose = require('mongoose');
const fs = require('fs');
const { json } = require('express');

// requring the model 
const Tour = require('./Model/Tour');

//making the connetction to the db

mongoose.connect('mongodb://127.0.0.1:27017/letgo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("database connected");
}).catch(err => {
    console.log("failed to connect ", err);
})

// reading the file 
const data = JSON.parse(fs.readFileSync('./dev-data/data/tours.json', 'utf-8'))

const importData = async () => {
    await Tour.create(data);
    console.log("data entred successfully");
    process.exit()
}
const deleteData = async () => {
    await Tour.deleteMany();
    console.log("data deleted successfully");
    process.exit()
}


try {
    if (process.argv[2] == '--import') {
        importData()

    } else if (process.argv[2] == '--delete') {
        deleteData()
    }

} catch (error) {
    console.log(error);
}































