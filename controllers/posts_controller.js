const Post = require('../models/post');
const Comment = require('../models/comment')
module.exports.create = async function (req, res) {
    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        })
        return res.redirect('back');
    } catch (err) {
        console.log("error", err);
        return;
    }
}

// module.exports.destroy = function(req, res){
//     Post.findById(req.params.id, function(err, post){
//         // .id means converting the object id into string
//         if (post.user == req.user.id){
//             post.remove();

//             Comment.deleteMany({post: req.params.id}, function(err){
//                 return res.redirect('back');
//             });
//         }else{
//             return res.redirect('back');
//         }

//     });
// }
//async await method
module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);
        // .id means converting the object id into string
        if (post.user == req.user.id) {
            post.remove();

            await Comment.deleteMany({ post: req.params.id });
            return res.redirect('back');

        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log("error", err);
        return;
    }
}