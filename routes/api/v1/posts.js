const express=require('express');//fetch the already present instance of express
const router=express.Router();
const passport=require('passport');
const postsApi=require('../../../controllers/api/v1/posts_api');
router.get('/',postsApi.index);
router.delete('/:id',passport.authenticate('jwt',{session:false}),postsApi.destroy);
module.exports=router;