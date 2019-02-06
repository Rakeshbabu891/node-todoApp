const {ObjectID} = require('mongodb');

var {mongoose} = require('./../server/db/mongoose.js');
var {User} = require('./../server/models/user.js');


var id = '5c5831609bd46128703f352';

if(!ObjectID.isValid(id)) {
  console.log('Id is not valid');
}


User.findById(id).then((user)=>{
    console.log(user.email);
  });
