const userModel = require("../Model/user.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

async function useSignin(req,res){
    try{
        const {email,password} =req.body;
console.log(email,password);
        if(!email){
            console.log("dbjsbd")
            return res.status(401).json({
                message : "Please enter email",
                err : true,
                success : false
            })
        }
        if (!password){
            return res.status(401).json({
                message : "Please enter password",
                err : true,
                success : false
            })
        }

        const user = await userModel.findOne({email})

        if(!user){
            return res.status(404).json({ //404
                message : "user not available",
                err : true,
                success : false
            })
        }
        // console.log("User",user); //last commented at 8/2/23

        // Load hash from your password DB.
        bcrypt.compare(password, user.password, function(err, result) {
            console.log(result);
            // res === true
            if(err){
                return res.status(500).json({  //500
                    message : err,
                    err : true,
                    success : false
                })
            }
            if(result == false){
                return res.status(401).json({
                    message : "Password doesn't match",
                    err : true,
                    success : false
                })
            }
            else{
                const payload  = {
                    _id : user._id,
                    email : user.email
                }
        
                const token = jwt.sign(payload,process.env.JWT_SECRTE,{
                    expiresIn : '3d'
                })
        
                // console.log("Token :",token);
                res.status(200).json({
                    token : token,
                    err: false,
                    success : true,
                    message: "Login successfully"
                })
            }
        });
    }
    catch(err){
        res.status(500).json({
            message : err,
            err : true,
            success : false
        })
    }
} 
module.exports = useSignin