const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt=require("bcrypt");
const userSchema = new mongoose.Schema(
    {
  firstName: {
    type: String,
    index:true,
    required: true,
    trim:true
  }, 
  lastName: { type: String ,trim:true},
  emailId: {
    type: String,
    required: true,
    lowercase:true,
    unique:true,
    trim:true
  },
  password: { type: String, required: true },
  age: { type: Number ,min:18},
  gender: { type: String },
  photoUrl:{
    type:String,
    default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUpsDK5dkH7envHCdUECqq0XzCWK1Dv96XcQ&s"
  },
  about:{
     type:String,
     default:"This a new user"
  },
  skills:{
     type:String,
     default:"js,C,HTML",
  },
  profession:{
    type:String,
    default:"Devloper"
  },
  isPremimum:
  {
    type:Boolean,
    deafult:false
  },
  memebership:{
    type:String
  }
},{timestamps:true});
userSchema.methods.getJWT=async function(){
     const token=await jwt.sign({_id:this._id},process.env.JWT_KEY,{expiresIn:"1d"});
     return token;
}
userSchema.methods.comparePassword=async function(password){
     return await bcrypt.compare(password,this.password);
}
// userSchema.methods.encryptPassword=async function(){
//     return await bcrypt.hash
// }
const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
