const sendToken = (user, statusCode, res) => {

    //Creating JWT Token
    const token = user.getJwtToken();   // this user tocken we can  access

    //setting cookies 
    //create option for cookies
    //js dont access this cookie valuve
    const options = {
        expires: new Date(
                Date.now() + process.env.COOKIE_EXPIRES_TIME  * 24 * 60 * 60 * 1000 
            ),
        httpOnly: true,
    }

    res.status(statusCode)
    .cookie('token', token, options)
    .json({
        success: true,
        token,
        user
    })


}

module.exports = sendToken;