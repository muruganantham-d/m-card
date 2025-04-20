module.exports = (err, req, res, next) =>{
    err.statusCode  = err.statusCode || 500; //500 - internal server error


    if(process.env.NODE_ENV == 'development'){     //for security purpose so some important detail only show developement
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            stack: err.stack,     // we can essy find were this error will commming !!
            error: err     // detailed error detail will come
        })
    }

    if(process.env.NODE_ENV == 'production'){
        let message = err.message;
        let error = new Error(message);
       

        if(err.name == "ValidationError") {
            message = Object.values(err.errors).map(value => value.message) //All error object have  message property
            error = new Error(message)  //tack array valuve return the string
            err.statusCode = 400 // 400 Bad Request
        }

        //if you provide wrong id in param mongoosh throw the castError
        if(err.name == 'CastError'){
            message = `Resource not found: ${err.path}` ; //path -> which fild(ky)
            error = new Error(message)
            err.statusCode = 400
        }

        if(err.code == 11000) {
            let message = `Duplicate ${Object.keys(err.keyValue)} error`;
            error = new Error(message)
            err.statusCode = 400
        }

        if(err.name == 'JSONWebTokenError') {
            let message = `JSON Web Token is invalid. Try again`;
            error = new Error(message)
            err.statusCode = 400
        }

        if(err.name == 'TokenExpiredError') {
            let message = `JSON Web Token is expired. Try again`;
            error = new Error(message)
            err.statusCode = 400
        }

        res.status(err.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error',
            // "message" came where ? the message property comming from "errorHandler.js" inside parent class "Error" is provide
        })
    }
}


// after use app.js