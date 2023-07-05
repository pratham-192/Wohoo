const mongoose=require('mongoose');
// mongoose.connect('mongodb://localhost/development_db');
mongoose.connect('mongodb+srv://mehtani2020:6ko7BtlgWjXg1M7J@cluster0.xa1l0vz.mongodb.net/',{
    useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db=mongoose.connection;
db.on('error',console.error.bind(console,"Error connecting to mongodb"));
db.once('open',function () { 
    console.log("connected to db mongodb")
 })
 module.exports=db;
