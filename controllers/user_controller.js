const User=require('../models/user');
module.exports.profile = function(req, res){
    User.findById(req.params.id,function(err,user)
    {
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user:user
        })
    })
    
}

module.exports.update=function(req,res)
{
    if(req.user.id==req.params.id)
    {
        User.findByIdAndUpdate(req.params.id,{name:req.body.name,email:req.body.email},function(err,user){
            return res.redirect('back');
        })
    }else{
        return res.status(401).send('Unauthorised')
    }
}
 //render the sign in page
module.exports.signIn=function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }

    return res.render('signin',{
        title:"Sign In Page"
    });
}

//render the sign up page
module.exports.signUp=function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }

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
    return res.redirect('/');
}

module.exports.DestroySession=function(req,res)
{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}