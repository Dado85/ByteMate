const express=require("express");
const userAuth = require("../../middlewares/userAuth");
const { sendConnection, reviewConnectionRequest } = require("../../controller/connectionController");
const requestRoutes=express.Router();
requestRoutes.post("/send/:status/:toUserId",userAuth,sendConnection);
requestRoutes.post("/review/:status/:requestId",userAuth,reviewConnectionRequest);

module.exports=requestRoutes;