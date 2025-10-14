const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

const connectMongoDB = async () => {
    await mongoose.connect(process.env.mongoDB_connection_string).then((res)=>{
        console.log("Connected to MongoDB successfully");
    }).catch((error)=>{
        console.log("Error in connecting to MongoDB:", error);
    });
}

module.exports = connectMongoDB;