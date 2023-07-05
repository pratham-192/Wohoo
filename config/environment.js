const development={
    name:"development",
    asset_path:'./assets',
    session_cookie_key:'something',
    db:'development_db',
    smtp:{
        service: 'gmail',
        //this is fake SMTP server and to use google server this can be done during deployement
        port: 587,//TLS configuration(high security)
        secure: false, // true for 465, false for other ports
        auth: {
            user: "prathammehtani23@gmail.com",
            pass: "zmshzjkezkkjdsdp"
        }
    },
    google_client_id:"43668741954-7hkrfaoger6r1v8n0i1f8gqm62fevj65.apps.googleusercontent.com",
    google_client_secret:"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",
    google_callback_url:"http://localhost:80/users/auth/google/callback",
    jwt_secret:'wohoo'
}
const production={
    name:"production"
}
module.exports=development;