const express = require('express');
const port = 8001;
const db = require('./config/mongoose');
const Task= require('./models/tasks');
// const bodyParser = require('body-parser');

const app = express();
app.use(express.urlencoded({extended: true}));
// Setting up the views
app.set('view engine','ejs');
app.set('views','./views');

// Any Request to web app Forward it to Routes folder!!
// app.use('/', require('./routes'));
app.use(express.urlencoded());
//Accessing Static folder
app.use(express.static('./assets'));




app.get('/',(req, res)=>{

    Task.find({},function(err,task){
      if (err){
        console.log("error in  fetching contacts from db");
        return;
      }
      return res.render('home',{task_list:task});
    })
      
  });


  app.post('/create-task' ,function(req,res){
  
  
    Task.create({
      task:req.body.description,
      category: req.body.category,
      duedate: req.body.duedate
    }, function(err, newTask){
      if (err){
      console.log('error in creating a contact');
      return;
    }
      console.log('******Successfully Created:-',newTask);
      return res.redirect('back');
    });
  
  });
  
  app.get("/delete/task/:id", (req, res) => {
    let id = req.query;
    console.log(id);
  
    // let count = Object.keys(id).length;
  
    // for (let i = 0; i < count; i++) {
    //   Task.findByIdAndDelete(Object.keys(id)[i], (err) => {
    //     if (err) {
    //       console.log("ERROR", err);
    //     }
    //   });
    // }
    // res.redirect("back");
  });


app.listen(port, function(err){
    if(err){
        console.log("Error in running the server");
    }
    console.log("Server running Sucessfuly at port: ",port);
    

})
