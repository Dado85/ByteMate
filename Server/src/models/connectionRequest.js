const mongoose=require("mongoose");
const connectionRequestSchema=new mongoose.Schema({
     fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"users",
     },
     toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"users",
     },
     status:{
        type:String,
        required:true,
        enum:{
          values:["ignored","interested","accepted","rejected"],
          message:"${VALUE} is incorrect status type"
        }
      },
      lastReminderAt:{
         type:Date,
         default:null
      }
},{ 
  timestamps:true
}) ;
connectionRequestSchema.index({fromUserId:1,toUserId:1},{unique:true});
const ConnectionRequestModel=mongoose.model("ConnectionRequest",connectionRequestSchema);
module.exports=ConnectionRequestModel;