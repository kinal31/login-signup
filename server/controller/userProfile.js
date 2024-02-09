const userModel = require("../Model/user.model");

async function useProfile (req,res){
    try{
        
        console.log("User Id - User profile :",req.userId);
        
        const user = await userModel.findById(req.userId).select("-password")

        res.status(200).json({
            message : "user details",
            data : user, 
            err : false,
            success: true 
        })
    }
    catch(err){
        res.status(500).json({
            message : err,
            err : true,
            success : false
        })
    }
}

module.exports = useProfile