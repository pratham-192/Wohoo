const User=require('../models/user');
const Friendship=require('../models/friendship');

module.exports.all=async function(req,res){
    let all_friendships;
    let all_friends=[];
    // for(let u of all_friendships){
    //     console.log(u);
    //     if(u.from_user==req.user.id){
    //         all_friends.push(u.to_user);
    //         console.log('from',u.to_user);
    //     }else{
    //         all_friends.push(u.from_user);
    //         console.log('to',u.from_user);
    //     }
    // }
    let user=await User.findById(req.user.id).populate({
        path:'friendships',
        populate:{
            path:'from_user to_user'
        }
    })
    all_friendships=user.friendships;
    // console.log(user.friendships.length)
    console.log(user.friendships);
    for(let u of all_friendships){
        // console.log(u);
        if(u.from_user.id==req.user.id){
            all_friends.push(u.to_user);
            // console.log('from',u.to_user);
        }else{
            all_friends.push(u.from_user);
            // console.log('to',u.from_user);
        }
    }
    console.log(all_friends);
    return res.render('friends',{
        title:'Friends',
        friends:all_friends
    })
}

module.exports.create=async function(req,res){
    let friendUser=await User.findById(req.params.id);
    let loggedUser=await User.findById(req.user.id);

    let existingFriend1=await Friendship.findOne({from_user:loggedUser, to_user:friendUser});
    let existingFriend2=await Friendship.findOne({from_user:friendUser, to_user:loggedUser});

    if(existingFriend1 || existingFriend2){
        req.flash('error','friend already exists');
        return res.redirect('back');
    }

    let newFriendship=await Friendship.create({
        from_user:loggedUser,
        to_user:friendUser
    })

    friendUser.friendships.push(newFriendship);
    friendUser.save();
    loggedUser.friendships.push(newFriendship);
    loggedUser.save();
    req.flash('success','friend added');
    // console.log(newFriendship);
    return res.redirect('back');
}

module.exports.delete=async function(req,res){
    let friendUser=await User.findById(req.params.id);
    let loggedUser=await User.findById(req.user.id);

    let existingFriend1=await Friendship.findOne({from_user:loggedUser, to_user:friendUser});
    let existingFriend2=await Friendship.findOne({from_user:friendUser, to_user:loggedUser});
    if(existingFriend1){
        friendUser.friendships.pull(existingFriend1);
        friendUser.save();
        loggedUser.friendships.pull(existingFriend1);
        loggedUser.save();
        await Friendship.deleteOne(existingFriend1);
    }else if(existingFriend2){
        friendUser.friendships.pull(existingFriend2);
        friendUser.save();
        loggedUser.friendships.pull(existingFriend2);
        loggedUser.save();
        await Friendship.deleteOne(existingFriend2);
    }
    return res.redirect('back');
}