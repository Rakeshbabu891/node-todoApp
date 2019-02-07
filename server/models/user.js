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
  token:[{
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
    user.token.push({access, token});

    user.save().then(() => {
       return token
    })
};



var User =mongoose.model('User',UserSchema);

module.exports = {User};
