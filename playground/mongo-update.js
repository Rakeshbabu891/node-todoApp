const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {

  if(err){
    console.log('unable to connect mongoDB');
  }
  db.collection('Todo').findOneAndUpdate(
    {
      _id:new ObjectID('5c57160a7374a44600dbf977')
  },{
  $set:{
    text:'vijay'
  }
  },{
  returnOriginal:false
  }
  ).then((result) => {
  console.log(result);
  });


});
