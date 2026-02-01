const mongoose=require("mongoose");
const msgSchema=new mongoose.Schema({
   text:{
     type:String,
     required:true
   },
   sender:{
    type:String,
    required:true,
   },
   reciever:{
    type:String,
    required:true
   }
})
const conversationSchema=new mongoose.Schema({
  users:[
    {
      type:String,
      required:true
    }
  ],
  msgs:[msgSchema]
});
const Chat=mongoose.model("chats",conversationSchema);
module.exports=Chat;

