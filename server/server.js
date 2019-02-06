var {ObjectId}= require('mongodb');
const express = require('express');
var bodyParser = require('body-parser');
const _ = require('lodash');


var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var app = express();

app.use(bodyParser.json());
const PORT = process.env.port || 3000;

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

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    // if(!ObjectID.isValid(id)){
    //   return res.status(404).send();
    // }

    Todo.findByIdAndRemove(id).then((result) => {
         console.log(`removed sucessfully ${result}`);
    },(e) => {
      console.log('could not find and remove',e);
    });

});

app.patch('/todos/:id', (req, res) => {
   var id = req.params.id;
   var body = _.pick(req.body, ['completed', 'text']);

console.log(`${_.isBoolean(body.completed)},${body.completed}`)

    if(_.isBoolean(body.completed) && body.completed){
      console.log('in side if condition')
      body.completedAt = new Date().getTime();
    }
    else{
          console.log('inside else condition');
           body.completed = false;
           body.completedAt = null;
        }

  Todo.findByIdAndUpdate(id, {
     $set:body
  },{
    new:true
  }).then((result) => {
    console.log('updated sucessfully',result)
    res.send(result);
  },(e) => {
    console.log('could not update');
  });



});

app.listen(PORT, () => {
  console.log(`Server has been started at : ${PORT}`);
});
