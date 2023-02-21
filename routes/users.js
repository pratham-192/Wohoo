const express=require('express');
const router=express.Router();
const passport=require('passport');

const userController=require('../controllers/user_controller');
//when user is signed in then only profile page is visible
router.get('/profile',passport.checkAuthentication,userController.profile)

router.get('/Sign-In',userController.signIn);
router.get('/Sign-Up',userController.signUp);
router.post('/create',userController.create);
router.get('/sign-out',userController.DestroySession);
//use passport as a middleware to authenticate
router.post('/createSession',passport.authenticate(
    'local',
    {failureRedirect:'/users/Sign-In'},
),userController.createSession)

module.exports=router;