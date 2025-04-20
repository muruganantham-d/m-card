class ErrorHandler extends Error {
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor) //this function set ErrorHandler object inside set "Stack" property
    }
}

module.exports = ErrorHandler;






// ErrorHandler  --> js error  class
//Error --->  js error class, its help to create error information

//captureStackTrace method  --> its help idendyfy Error what kind of error ? where it generated from