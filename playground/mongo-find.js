const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {

  if(err){
    console.log('unable to connect mongoDB');
  }
   db.collection('Todo').find().toArray().then((res) => {
     console.log(JSON.stringify(res, undefined, 2));
   },(err) => {
     console.log('could not connect:' + err);
   }
 )

});
