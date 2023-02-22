const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 80;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//user for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo');
const saasMiddleware=require('node-sass-middleware');

//saas must be loaded before the server's middleware's fire up because it is finally becoming CSS
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

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name:'codeial',
    secret:'something',//TODO --> change the secret before deployment in production mode
    saveUninitialized:false,//when user is not logged in then not required to store extra data in cookie
    resave:false,//when identity is establised, not save data repetitively
    cookie:{
        maxAge:(1000*60*100)//its in milli-seconds
    },
    store:  MongoStore.create(
        {
            mongoUrl:'mongodb://localhost/development_db',
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
// use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
