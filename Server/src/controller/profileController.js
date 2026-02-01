const UserModel = require("../models/user");
const bcrypt=require("bcrypt"); 
const uploadonCloudinary=require("../config/cloudinary");
async function getProfile(req,res){
  console.log(req.user);
  
  const userId=req.user._id;
   const user=await UserModel.findById(userId);
   res.send(user);
}
async function editProfile(req,res){
     const validData=req.validateBody;

      if (req.file) {
         const uploadedUrl = await uploadonCloudinary(req.file.path);
      validData.photoUrl = uploadedUrl; // assign the uploaded URL to validData
   }
     const updatedUser=await UserModel.findByIdAndUpdate(req.user?._id,validData,{new:true});
     res.json({
      message:`${updatedUser.firstName},your profile updated successfully`,
      data:updatedUser
     })
}
async function forgotPassword(req,res){
  const user=await UserModel.findOne({emailId:req.body.emailId});
  if(!user){
     return res.status(401).json({
        msg:"user doesnot exist ,signup to continue"
     })}
     const newpassword=req.body.password;
     user.password=await bcrypt.hash(newpassword,10);
     await user.save();
     res.json({
      msg:"password reset successfully"
     })
  
}
module.exports={
  getProfile,editProfile,forgotPassword
}