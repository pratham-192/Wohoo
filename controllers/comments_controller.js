const Comment = require('../models/comment');
const Post = require('../models/post');

// module.exports.create =function(req, res){
//     Post.findById(req.body.post, function(err, post){

//         if (post){
//             Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             }, function(err, comment){
//                 // handle error

//                 post.comments.push(comment);
//                 post.save();

//                 res.redirect('/');
//             });
//         }

//     });
// }
//async await method
module.exports.create = async function (req, res) {
    try {
        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();

            res.redirect('/');
        }
    } catch (err) {
        console.log("error", err);
        return;
    }
}
// module.exports.destroy = function (req, res) {
//     Comment.findById(req.params.id, function (err, comment) {
//         if (comment.user == req.user.id) {

//             let postId = comment.post;

//             comment.remove();

//             Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }, function (err, post) {
//                 return res.redirect('back');
//             })
//         } else {
//             return res.redirect('back');
//         }
//     });
// }
//async await method
module.exports.destroy =async function (req, res) {
    let comment=await Comment.findById(req.params.id);
    if (comment.user == req.user.id) {

        let postId = comment.post;

        comment.remove();

        let post=Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
        return res.redirect('back');
    } else {
        return res.redirect('back');
    }
}