const express = require("express");
const cors = require("cors");
const userAuth = require("../../middlewares/userAuth");
const { editProfile, getProfile, forgotPassword } = require("../../controller/profileController");
const validateProfileUpdate = require("../../middlewares/profileUpdate");
const uploadFile = require("../../middlewares/multer");

const profileRouter = express.Router();



profileRouter.get("/view", userAuth, getProfile);
profileRouter.post("/edit", userAuth, uploadFile,validateProfileUpdate,editProfile);
profileRouter.patch("/reset-password", userAuth, forgotPassword);

module.exports = profileRouter;
