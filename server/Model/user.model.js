const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
        trim : true
    },
    email:{
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    password:{
        type : String,
        required : true,
        trim : true
    }
},{
    timestamps : true
})

//model
const userModel = mongoose.model("sign-login", userSchema)

module.exports = userModel