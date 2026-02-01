const Chat = require("../models/chat");

async function addmsgtoConversation(participants,msg){
  try {
    let conversation=await Chat.findOne({users:{$all:participants}});
    if(!conversation){
      conversation=await Chat.create({users:participants});
    }
    conversation.msgs.push(msg);
    await conversation.save();
     return conversation;
  } catch (error) {
     console.error(error.message);
  }
}
async function getConversation(req,res) {
    const loggedInuserId=req.user._id;
    const user2=req.params.userId;
    const conversation=await Chat.findOne({users:{$all:[loggedInuserId,user2]}});
    return res.status(200).json(conversation.msgs||[]);
}
module.exports={addmsgtoConversation,getConversation};