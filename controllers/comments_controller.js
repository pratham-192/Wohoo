const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer=require('../mailers/comments_mailer');
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

            // Similar for comments to fetch the user's id!
            comment = await comment.populate('user', 'name email');
            commentsMailer.newComment(comment);

            if (req.xhr){
                
    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }
            req.flash('success','comment added');
            res.redirect('/');
        }
    } catch (err) {
        req.flash('error',err);
        return res.redirect('back');
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
        // send the comment id which was deleted back to the views
        if (req.xhr){
            return res.status(200).json({
                data: {
                    comment_id: req.params.id
                },
                message: "Post deleted"
            });
        }
        req.flash('success','comment deleted');
        return res.redirect('back');
    } else {
        req.flash('error','You are not authorised to delete this comment');
        return res.redirect('back');
    }
}