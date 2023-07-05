const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//user for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportJWT=require('./config/passport-jwt-strategy');
const passportGoogle=require('./config/passport-google-oauth2-strategy');


//to manage if the user is signed in and we restart the server then also the user is signed in
const MongoStore=require('connect-mongo');
const saasMiddleware=require('node-sass-middleware');
const flash= require('connect-flash');
const customMware=require('./config/middleware');

// setup the chat server to be used with socket.io
// const chatServer = require('http').Server(app);
// const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
// chatServer.listen(8000);
// console.log('chat server is listening on port 8000');

//saas must be loaded before the server's middleware's fire up because it is finally becoming CSS
//(for increasing speed of website)
app.use(saasMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css' 
}))

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

// make the uploads path available to the browser
app.use('/uploads',express.static(__dirname+'/uploads'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name:'wohoo',
    secret:'something',//TODO --> change the secret before deployment in production mode
    saveUninitialized:false,//when user is not logged in then not required to store extra data in cookie
    resave:false,//when identity is establised, not save data repetitively
    cookie:{
        maxAge:(1000*60*100)//its in milli-seconds(age of cookie)
    },
    store:  MongoStore.create(
        {
            mongoUrl:'mongodb+srv://mehtani2020:6ko7BtlgWjXg1M7J@cluster0.xa1l0vz.mongodb.net/',
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}))

app.use(passport.initialize());
app.use(passport.session());
//set the authenticated user in the locals of views
app.use(passport.setAuthenticatedUser);

//Connect-flash needs express-session and cookie-parser middleware to be able to store flash messages
app.use(flash());
//custom middleware is used to put flash messages from request to response(locals)
app.use(customMware.setFlash);
// use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
