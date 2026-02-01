const express = require("express");

const authRouter = require("./v1/authRoutes");
const profileRouter = require("./v1/profileRoutes");
const requestRoutes = require("./v1/requestRoutes");
const userRoutes = require("./v1/userRoutes");
const paymentRouter = require("./v1/paymentRoutes");
const chatRoutes = require("./v1/chatRoutes");
const v1router = express.Router();

v1router.use("/auth", authRouter);
v1router.use("/profile", profileRouter);
v1router.use("/request", requestRoutes);
v1router.use("/user", userRoutes);
v1router.use("/payment", paymentRouter);
v1router.use("/conversation", chatRoutes);
module.exports = v1router;
