const Post = require('../models/post');
const User = require('../models/user');
// module.exports.home=function (req,res) { 
//     //populate the user of every post
//     Post.find({})
//     .populate('user')
//     .populate({
//         path:'comments',
//         populate:{
//             path:'user'
//         }
//     })
//     .exec(function(err,posts){
//         User.find({},function(err,users){
//             return res.render('home', {
//                 title: "Wohoo | Home",
//                 posts:posts,
//                 all_users:users
//             });
//         }) 
//     })
//  }
//async await method to make code cleaner
module.exports.home = async function (req, res) {
    try {
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate
        ({
            path: 'comments',
            populate:
            {
                path: 'user'
            }
        })
        .populate
        ({
            path: 'comments',
            populate:
            {
                path: 'likes'
            }
        })
        .populate('likes');
            
        let users = await User.find({});
        return res.render('home', {
            title: "Wohoo | Home",
            posts: posts,
            all_users: users
        })
    } catch (err) {
        console.log("error", err);
        return;
    }
}