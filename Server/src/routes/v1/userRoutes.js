const express=require("express");
const userAuth = require("../../middlewares/userAuth");
const { getAllReceivedRequest, getAllConnection, getFeed, deleteConnection } = require("../../controller/userController");
const userRoutes=express.Router();
userRoutes.get("/request/received",userAuth,getAllReceivedRequest);
userRoutes.get("/connection",userAuth,getAllConnection);
userRoutes.get("/feed",userAuth,getFeed);
userRoutes.delete("/remove/:dltConnectionId",userAuth,deleteConnection);

module.exports=userRoutes;