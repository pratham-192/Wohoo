const nodemailer = require('../config/nodemailer');


exports.newComment = (comment) => {
    // console.log(comment);
    let htmlString=nodemailer.renderTemplate({comment:comment},'/comments/newComment.ejs');
    nodemailer.transporter.sendMail({
        from: 'prathammehtani23@gmail.com',
        to: comment.user.email,
        subject:"new comment published",
        html:htmlString

    },(err,info)=>{
        if(err){
            console.log('error in sending mails');
            return;
        }
        console.log('message sent',info);
        return;
    })
}