const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path')
let transporter = nodemailer.createTransport({
    // service: 'gmail',
    //this is fake SMTP server and to use google server this can be done during deployement
    host: "smtp.ethereal.email",
    port: 587,//TLS configuration(high security)
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'zetta.price35@ethereal.email',
        pass: 'WrRGz9cEWEHDq8zagb'
    },
});

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers',relativePath),
        data,
        function (err, template) {
            if (err) {
                console.log("error in rendering template", err);
                return;
            }
            mailHTML = template;
        }
    )
    return mailHTML;

}
module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}