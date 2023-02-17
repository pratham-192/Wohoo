const express=require('express');//fetch the already present instance of express
const router=express.Router();

//adding controller
const homeController=require('../controllers/home_controller');

router.get('/',homeController.home);
router.use('/users',require('./users'));
module.exports=router;
