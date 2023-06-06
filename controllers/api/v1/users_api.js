const User=require('../../../models/user');
const jwt=require('jsonwebtoken');
const env=require('../../../config/environment');
module.exports.createSession=async function(req,res){
    try{
        let user =await User.findOne({email:req.body.email});
        if(!user || user.password!=req.body.password){
            return res.json.status(422).json({
                message:"invalid username or password"
            });
        }
        return res.status(200).json({
            message:"sign in successful here is your token please keep it safe",
            data:{
                token:jwt.sign(user.toJSON(),env.jwt_secret,{expiresIn:100000})
            }
        })
    }catch(err){
        return res.status(500).json({
            message:"internal server error"
        })
    }
}