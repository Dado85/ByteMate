const express=require("express");
const { getConversation } = require("../../controller/msgController");
const userAuth = require("../../middlewares/userAuth");
const chatRoutes=express.Router();
chatRoutes.get("/:userId",userAuth,getConversation);
module.exports=chatRoutes;