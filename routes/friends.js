const express=require('express');//fetch the already present instance of express
const router=express.Router();
const passport=require('passport');
const friendController=require('../controllers/friends_controller');
router.get('/',passport.checkAuthentication,friendController.all);
router.post('/create-friend/:id',passport.checkAuthentication,friendController.create);
router.get('/delete-friend/:id',passport.checkAuthentication,friendController.delete)

module.exports=router;