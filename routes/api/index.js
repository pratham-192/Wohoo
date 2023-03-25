const express=require('express');//fetch the already present instance of express
const router=express.Router();
router.use('/v1',require('./v1'));
module.exports=router;