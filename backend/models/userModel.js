const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, 'Please enter name']
    },
    email:{
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        maxlength: [6, 'Password cannot exceed 6 characters'],
        select: false   // password field not come
    },
    avatar: {
        type: String
    },
    role :{
        type: String,
        default: 'user'
    },
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
    createdAt :{
        type: Date,
        default: Date.now
    }
})



/** For password encription **/
userSchema.pre('save', async function (next){
    if(!this.isModified('password')){   //if 'password' is not available dont need to encript
        next();
    }
    //isModified - is schema methoad
    this.password  = await bcrypt.hash(this.password, 10) //10-is round salt encription
})
//pre - prepland function



/** jwt token generate **/
userSchema.methods.getJwtToken = function(){
   return jwt.sign({id: this.id}, process.env.JWT_SECRET, {      //after runned the user schema the id is available 
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}


/** jwt token generate **/
userSchema.methods.isValidPassword = async function(enteredPassword){  //param is user inputed valuve 
    return  bcrypt.compare(enteredPassword, this.password) //this.pass -> alredy stored pass
}
//return the boolean valuve, its promise



/** For Recet Password **/
userSchema.methods.getResetToken = function(){
    //Generate Token -> using cripto js npm
    const token = crypto.randomBytes(20).toString('hex');

    //Generate Hash and set to resetPasswordToken
   this.resetPasswordToken =  crypto.createHash('sha256').update(token).digest('hex');
             //sha256 - is algoritham ( learn criptography )

   //Set token expire time
    this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000;     //30 mis

    return token
}
let model =  mongoose.model('User', userSchema);


module.exports = model;