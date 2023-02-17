const express=require('express');
const router=express.Router();

const userController=require('../controllers/user_controller');
router.get('/profile',userController.profile)

router.get('/Sign-In',userController.signIn);
router.get('/Sign-Up',userController.signUp);
router.post('/create',userController.create);

module.exports=router;