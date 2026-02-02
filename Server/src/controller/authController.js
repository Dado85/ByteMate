const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
const { validateSignup, validateLogin } = require("../validation/index");
const jwt = require("jsonwebtoken");
async function signup(req, res) {
  const signupRes = validateSignup.safeParse(req.body);
  if (!signupRes.success) {
    const errors = signupRes.error.issues.map((e) => ({
      field: e.path[0],
      message: e.message,
    }));
    return res.status(400).send(errors);
  } else {
    const { firstName, lastName, emailId, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
    });
    newUser.password = undefined;
    return res.status(200).json({
      success: true,
      message: "user Created",
      data: newUser,
    });
  }
}

async function login(req, res) {
  const result = validateLogin.safeParse(req.body);
  if (!result.success) {
    const errors = result.error.issues.map((e) => ({
      field: e.path[0],
      message: e.message,
    }));
    res.status(400).send(errors);
  } else {
    const { emailId, password } = result.data;
    const user = await UserModel.findOne({ emailId: emailId });
    if (!user) {
      return res.json({ msg: "Invalid credentials" });
    }
    const ispasswordvalid = await user.comparePassword(password);
    if (!ispasswordvalid) {
      return res.status(400).json({
        success: false,
        data: "Invalid credentials",
      });
    }
    const token = await user.getJWT();
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.status(200).json({
      message: "logged in successfull",
      data: user,
    });
  }
}

async function logout(req, res) {
  res.cookie("token", null, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
}
module.exports = {
  signup,
  login,
  logout,
};
