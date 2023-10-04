
// for creating token
const crypto = require('crypto');

const mongoose = require('mongoose');
const validator = require('validator');
// for encription
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "user supposed to have an name"],
        minLength: [2, "name to be atleast of 2 characters"],
        maxLength: [20, "name cannot exceed 20 characters"],
        trim: true,
        lowercase: true

    },
    email: {

        type: String,
        required: [true, "user must provide email address"],
        unique: true,
        validate: [validator.isEmail, 'please provide valid email'],
        trim: true,
        lowercase: true


    },
    password: {
        type: String,
        required: [true, "please enter password"],
        select: false

    },
    Cnfpassword: {
        type: String,

        // for checking password=cnfpass
        validate: {
            required: [true, "please enter confirm password"],
            validator: function (cnfPassData) {
                return cnfPassData === this.password
            },
            message: 'please check your password again!',
        }
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },

    passwordChanged: Date,
    passwordRestToken: String,
    passwordExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
})

// we will add query middleware 
userSchema.pre(/^find/, function (next) {

    this.find({ active: { $ne: true } })
    next()
})



// we want to encrypt the password and then save it 
// using schema middleware 
userSchema.pre('save', async function (next) {


    if (!this.isModified('password')) {
        console.log("in");
        return next();
    }

    this.password = await bcrypt.hash(this.password, 12);
    this.cnfPassword = undefined
    next()
})

// we need to define the password change field okk 
userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) {
        return next()
    }

    this.passwordChanged = Date.now() + 1000;
    next()
})


// we will define a method which will be available on all 
userSchema.methods.correctPass = async function (password, userPassword) {
    {
        return await bcrypt.compare(password, userPassword)
    }
}


userSchema.methods.chagedPassword = function (time) {
    if (this.passwordChanged) {

        let timeChanged = this.passwordChanged.getTime() / 1000;

        return time < timeChanged
    }
    return false;
}


userSchema.methods.createPasswordResetToken = function () {
    let token = crypto.randomBytes(32).toString('hex');

    //we are encrypting the token and saving it into DB 
    this.passwordRestToken = crypto.createHash('sha256').update(token).digest('hex');
    console.log(token);
    // setting expiry of token
    this.passwordExpires = Date.now() + 10 * 60 * 1000

    // we will send this token in mail to user
    return token;

}



const User = mongoose.model('User', userSchema);
module.exports = User;






















