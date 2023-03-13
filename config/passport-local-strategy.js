const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback:true//it allows us to use req as the first argument in the callback function
},
    function (req,email, password, done) {
        //find the user and establish the identity
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                req.flash('error',err);
                return done(err);//response to passport that there is error in finding the user
            }
            if (!user || user.password != password) {
                req.flash('error','invalid user or password');
                return done(null, false);//it means that there is no error but user is not found
            }
            return done(null, user);//return the user to passport
        })
    }
))

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {//here id is kept into cookie in a encrypted format
    done(null, user.id);
})

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log('error in finding the user ---> passport');
            return done(err);
        }
        return done(null, user)
    })
})


//check if user is authenticated
passport.checkAuthentication=function (req,res,next) {
    //if the user is signed in then pass on the request to the next function(controller's action)
    if(req.isAuthenticated())return next();
    //if user is not signed in
    return res.redirect('/users/Sign-In');
  }

passport.setAuthenticatedUser=function (req,res,next) { 
    if(req.isAuthenticated())
    {
        //req.user contains the current signed in user from the session cookie and we are just 
        //sending it to the locals for views
        res.locals.user=req.user;
    }
    next();
 }
module.exports=passport;