const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

//tell passport to use new strategy for google auth
passport.use(new googleStrategy({
    clientID:"43668741954-7hkrfaoger6r1v8n0i1f8gqm62fevj65.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:80/users/auth/google/callback"
},function(accessToken,refreshToken,profile,done){
    //find the user
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log("error in google strategy passport",err);
            return;
            
        }
        //if user if found, set this user as req.user
        if(user){
            return done(null,user);
        }else{
            //if not found, create the user and set this user as req.user
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){
                    console.log("error in google strategy passport",err);
                    return; 
                }
                return done(null,user);
            })
        }
    })
}
))
module.exports=passport;