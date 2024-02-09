const jwt = require('jsonwebtoken')

async function verifyToken(req,res,next){
    try{
        const auth = req.headers.authorization
        const token= auth.split(' ')[1]
        console.log("Hello");
        console.log("Token :", token);

        jwt.verify(token,process.env.JWT_SECRTE,(err,decode)=>{
            console.log("Decode :",decode);

            if(err){
                res.status(400).json({
                    message : "Unauthorized access",
                    err : true,
                    success : false
                })
            }else{

            req.userId = decode._id;

            next();
            }
        })

        // console.log("Token",token);
    }
    catch(err){
        res.status(500).json({
            message : err,
            err : true,
            success : false
        })
    }
}

module.exports = verifyToken