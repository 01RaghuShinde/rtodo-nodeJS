// importing mongoose
const mongoose = require('mongoose');
// connecting to db
mongoose.connect('mongodb://localhost/tasks_list_db');
// Acquire the Connection
const db = mongoose.connection;
// if error occurs
db.on('error',console.error.bind(console,'error Connecting to the DB'));
// if up and running  print the msg
db.once('open',function(){
    console.log("Succeessfully Connected to the Database Using Mongoose.");
})