const userModel = require("../Model/user.model")
const bcryptjs = require('bcryptjs')

async function userSignup (req,res){
    try{
        
        if (!req.body.name){
            return res.status(401).json({
                message : "Please enter name",
                err : true,
                success : false
            })
        }
        if (!req.body.email){
            return res.status(401).json({
                message : "Please enter email",
                err : true,
                success : false
            })
        }
        if (!req.body.password){
            return res.status(401).json({
                message : "Please enter password",
                err : true,
                success : false
            })
        }

        //if user alredy signup condition
        const user = await userModel.findOne({email: req.body.email})
        // console.log("user:",user);

        if(user){
            return res.status(409).json({
                message : "User already exist",
                err : true,
                success : false
            })
        }

        bcryptjs.genSalt(10,  function(err, salt) {
            // console.log("Error generating through gensalt :", err)
            bcryptjs.hash(req.body.password, salt, async function(err, hash) {
                if(err){
                    return res.status(400).json({
                        message : err,
                        err : true,
                        success : false
                    })
                }

                console.log("Hash",hash);

                const payload = {
                    ...req.body,
                    password : hash
                }

                const userDetails = new userModel(payload)
                const save = await userDetails.save()

                return res.status(200).json({
                    message : "user created sucessfully",
                    data : save,
                    err : false,
                    success : true
                })
            });
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

module.exports = userSignup