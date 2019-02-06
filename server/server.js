const express = require('express');
var ObjectId = require('mongodb').ObjectID;
var bodyParser = require('body-parser');


var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res) => {
   var newTodo = new Todo({
    text:req.body.text
   });

   newTodo.save().then((doc) => {
     console.log(doc)
   },(err) => {
     console.log(err)
   });
});

app.get('/todos', (req,res) => {
  Todo.find().then((todos) => {
     res.send({todos});
  },(e) => {
    res.status(400).send(e);
  })
});

app.get('/todos/:id', (req,res) => {
   var id = req.params.id;
   // if(!ObjectID.isValid(id)){
   //   return res.status(404).send();
   // }
   User.findById(id).then((doc) => {
     console.log('Connected to data base:',doc);
   },(e) => {
     console.log('could not find id');
   }).catch((e) => {
     res.status(404).send();
   });
});

app.listen(3000, () => {
  console.log('server has been started');
});
