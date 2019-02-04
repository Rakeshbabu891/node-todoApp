const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {

  if(err){
    console.log('unable to connect mongoDB');
  }
   db.collection('Todo').findOneAndDelete({text:'rakesh'}).then((result) => {
     console.log(result);
   });

});
