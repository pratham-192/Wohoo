const express=require('express');//fetch the already present instance of express
const router=express.Router();
router.use('/posts',require('./posts'));
router.use('/users',require('./users'));
module.exports=router;