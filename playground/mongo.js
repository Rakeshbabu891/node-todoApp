const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log('unable to connect');
  }
  console.log('Database connected sucessfully');
  db.collection('Todo').insertOne({
    text:'something to do',
    completed: false
  }, (err, result) => {
      if(err){
        return console.log('could not inserted into db', err);
      }
      console.log(JSON.stringify(result.ops, undefined, 2));
  });

  db.close();
});
