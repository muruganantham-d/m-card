const ErrorHandler = require("../utils/errorHandler");
const User = require('../models/userModel')
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken');

exports.isAuthenticatedUser = catchAsyncError( async (req, res, next) => {
   const { token  }  = req.cookies;  //we need ti install -> cookie-parser then only data comie in app.js
   
   if( !token ){
        return next(new ErrorHandler('Login first to handle this resource', 401))  //product, or user resource
   }

   const decoded = jwt.verify(token, process.env.JWT_SECRET)
   req.user = await User.findById(decoded.id)
   next();
})

exports.authorizeRoles = (...roles) => {  ///we get all roles in using spret operatore
   return  (req, res, next) => {            // must need to return the callback funtion
        if(!roles.includes(req.user.role)){  // req.user.role ---> we can access in line "14"
            return next(new ErrorHandler(`Role ${req.user.role} is not allowed`, 401))     // 401 unAutherised
        }
        next()  //if no error, this request go to another middleware (thus why we use Next())
    }
}   