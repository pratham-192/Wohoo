const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/users/avatars')

const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    accessToken:
    {
        type: String,
        default: 'abc'
    },
    isTokenValid:
    {
        type: Boolean,
        default: false
    }
},{
    timestamps:true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
  })

  //static
  //.single() specifies that only one file can be uploaded(not array of files)
  userSchema.statics.uploadedAvatar=multer({storage: storage}).single('avatar');
  //we can access it as User.uploadedAvatar from outside this file
  userSchema.statics.avatarPath=AVATAR_PATH;//made AVATAR_PATH publicily available


const User=mongoose.model('User',userSchema);
module.exports=User;