const express = require('express');

// creating an express router
const Router = express.Router();
// bringing controller 
const userRoutes = require('./../Controllers/userController')
const authRoutes = require('./../Controllers/authController')
//protect middleware
const protect = require('./../Middleware/protect')


Router.post('/signup', authRoutes.createUser)
Router.post('/login', authRoutes.login)
Router.post('/forgotPassword', authRoutes.forgotPassword)
Router.patch('/resetPassword/:token', authRoutes.resetPassword)
Router.post('/changePassword', protect.protectRoute, authRoutes.changePassword)
Router.patch('/updateMe', protect.protectRoute, userRoutes.updateMe)
Router.get('/deleteMe', protect.protectRoute, userRoutes.deleteMe)

module.exports = Router;











