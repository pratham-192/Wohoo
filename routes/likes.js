const express=require('express');//fetch the already present instance of express
const router=express.Router();

const likesController=require('../controllers/likes_controller');
router.post('/toggle',likesController.toggleLike);


module.exports=router;