const User=require('../models/user');
module.exports.profile = function(req, res){
     //profile page is only visible when user is signed in
     if(req.cookies.user_id)
     {
        User.findById(req.cookies.user_id,function(err,user)
        {
            if(user)
            {
                return res.render('user_profile',{
                    title:"user's profile",
                    user:user
                })
            }else res.redirect('/users/Sign-In')
        })
     }else{
        return res.redirect('/users/Sign-In');
     }
}
 //render the sign in page
module.exports.signIn=function(req,res)
{
    return res.render('signin',{
        title:"Sign In Page"
    });
}

//render the sign up page
module.exports.signUp=function(req,res)
{
    return res.render('signup',{
        title:"Sign Up Page"
    });
}

//get the sign up data
module.exports.create=function(req,res)
{
    if(req.body.password!=req.body.confirmpassword)
    {
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log("Error in finding the user signing up");
        return;}
        if(!user)
        {
            User.create(req.body,function(err,user){
                if(err)
                {
                    console.log("Error in creating the user signing up");
                    return;
                }
                return res.redirect('/users/Sign-In')
            })
        }else{
            return res.redirect('back');

        }
    });
}

//sign in and create session for the user
module.exports.createSession=function(req,res)
{
    //steps to authenticate


    //find the user
    User.findOne({email:req.body.email},function(err,user)
    {
        if(err)
        {
            console.log("error in finding user signing in");
            return;
        }
        //handle user found
        if(user)
        {
             //handle mismatching of passwords
            if(user.password!=req.body.password)
            {
                return res.redirect('back');
            }
            //handle session creation
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');
        }else{
            //handle user not found
            res.redirect('back');
        }
    })
}

module.exports.DeleteSession=function(req,res)
{
    // res.clearCookie("userid");
    res.clearCookie('user_id');
    return res.redirect('/users/profile')
}