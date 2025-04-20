const mongoose = require('mongoose');

const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_LOCAL_URI,{
        useNewUrlParser:true,  // use new methoad ->for get detail from uerl
        useUnifiedTopology:true  // old option you dont need to use thus why 
    }).then(con=>{
        console.log(`MongoDB is connected to the host: ${con.connection.host} `)
    })  //dont use catch then unhandled regection error comme so fix in server.js
}

module.exports = connectDatabase;