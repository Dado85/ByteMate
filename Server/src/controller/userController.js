const { success } = require("zod");
const ConnectionRequestModel = require("../models/connectionRequest");
const UserModel = require("../models/user");
const { request } = require("express");
const User_Safe_Data="firstName lastName gender age about skills photoUrl _id profession";
async function getAllReceivedRequest(req, res) {
  try {
    const loggedUser = req.user?._id;
    const request = await ConnectionRequestModel.find({
      toUserId: loggedUser,
      status: "interested",
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "about",
      "photoUrl",
      "age",
      "gender",
    ]);
    if (request.length == 0) {
      return res.status(200).json({
        message: "No pending request present",
        data:request
      });
    }
    return res.status(200).json({
      success: true,
      message: "request fetched successful",
      data: request,
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
}
async function getAllConnection(req, res) {
  try {
    const loggedUser = req?.user?._id;
    const connection = await ConnectionRequestModel.find({
      $or: [{ toUserId: loggedUser }, { fromUserId: loggedUser }],
      status: "accepted",
    }).populate("fromUserId", User_Safe_Data).populate("toUserId",User_Safe_Data);
    if (!connection || connection.length == 0) {
      return res
        .status(200)
        .json({
          message: "You have no connections. Accept requests to connect.",
          data:connection
        });
    }
    const data = connection.map((row) =>(row?.fromUserId?._id.toString()===loggedUser.toString() ? row?.toUserId : row?.fromUserId));
    
    res.status(200).json({
      sucess: true,
      message: "data fetched sucessfully",
      data:data
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
}
async function getFeed(req, res) {
  try {
    const loggedUser = req?.user?._id;
    const page=parseInt(req.query.page)||1;
    const limit=parseInt(req.query.limit)||5;
    const skip=(page-1)*limit;
    const connection = await ConnectionRequestModel.find({
      $or: [{ fromUserId: loggedUser }, { toUserId: loggedUser }],
    }).select("fromUserId toUserId");
    const excludeUserIds = new Set();
    connection.forEach((request) => {
      excludeUserIds.add(request.fromUserId.toString());
      excludeUserIds.add(request.toUserId.toString());
    });
    const newUsers = await UserModel.find({
      $and: [
        { _id: { $nin: Array.from(excludeUserIds) } },
        { _id: { $ne: loggedUser } },
      ],
    })
      .select(User_Safe_Data)
      .limit(limit)
      .skip(skip);
    res.status(200).json({
      success: true,
      message: "data fetched successfully",
      data: newUsers,
    });
  } catch (error) {
    return res.status(400).send(error);
  }
}
async function deleteConnection(req,res){
   try {
       const {dltConnectionId}=req?.params
      const dltConnection=await ConnectionRequestModel.findOneAndDelete({
        $or: [
        { fromUserId: dltConnectionId },
        { toUserId: dltConnectionId }
      ],
        status:"accepted"
      });
    
      if(!dltConnection){
        return res.status(404).json({
          sucess:false,
          message:"Connection not found or status is not accepted",
          data:dltConnection
        })
      }
      console.log("Deleting connection with ID:", dltConnectionId);

      res.status(200).json({
        sucess:true,
        message:"successfully deleted the connection",
        data:dltConnection
      })
   } catch (error) {
      return res.status(400).send(error.message);
   }
}
module.exports = {
  getAllReceivedRequest,
  getAllConnection,
  getFeed,
  deleteConnection
};
