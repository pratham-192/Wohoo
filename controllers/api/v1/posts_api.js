const Post=require('../../../models/post');
const Comment=require('../../../models/comment');

module.exports.index=async function(req,res){
    let posts = await Post.find({})
            // .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            })
            .sort({'createdAt':'desc' });
            return res.status(200).json({
                message:"a list of adfasfasdfposts",
                post:posts
            })
}

module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);
        // .id means converting the object id into string
        if (post.user == req.user.id) {
            post.remove();

            await Comment.deleteMany({ post: req.params.id });

            // if (req.xhr){
            //     return res.status(200).json({
            //         data: {
            //             post_id: req.params.id
            //         },
            //         message: "Post deleted"
            //     });
            // }
            return res.status(200).json({
                message:"posts and associated comments deleted"
            })

        } else {
            return res.status(401).json({
                message:"you cannot delete this post"
            })
        }
    } catch (err) {
        return res.status(500).json({
            message:"internal server error"
        })
    }
}