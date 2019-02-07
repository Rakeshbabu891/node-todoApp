var mongoose = require('mongoose');
var validator = require('validator');
const jwt =require('jsonwebtoken');
const _ = require('lodash');


var UserSchema  = new mongoose.Schema({
  email:{
    type:String,
    required:true,
    minlength:1,
    trim:true,
    unique:true,
    validate:{
      validator:(value) => {
        validator.isEmail(value)
      },
      message:'{VALUE} is not a valid email'
  }
},
  password:{
    type:String,
    minlength:6,
    required:true
  },
  tokens:[{
    access:{
      type:String,
      required:true
    },
    token:{
      type:String,
      required:true
    }

  }]

});

UserSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject, ['email','password']);
}

UserSchema.methods.generateAuthToken = function(){
   var user = this;
   var access = 'auth';
   var token = jwt.sign({_id:user._id.toHexString(), access},'abc123').toString();
    user.tokens.push({access, token});

    return user.save().then(() => {
       return token;
    });
};

UserSchema.statics.findByToken = function(token){
  var User = this;
  var decode;
  try{
     console.log('try is working');
     decode = jwt.verify(token, 'abc123');
    console.log(`decoded:${decode._id}`);
  }catch(e)
  {  console.log('catch is working');
     return Promise.reject();
  }
  return User.findOne({
    '_id':decode._id,
    'tokens.token':token,
    'tokens.access':'auth'

  });
};



var User =mongoose.model('User',UserSchema);

module.exports = {User};
