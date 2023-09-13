const express = require("express");
const userControl = require("../../controller/userController/userController.js")
const userAuthentication = require("../../middleware/userAuthenticatio/userAuthentication.js");
const userRouter = express.Router();

userRouter.route("/register").post(userAuthentication, userControl.userSingUp);
userRouter.route("/login").post(userAuthentication, userControl.logInUser);
userRouter.route("/profile").put(userAuthentication, userControl.updateProfile);
userRouter.route("/delete").delete(userAuthentication, userControl.deleteAccount);

module.exports = userRouter;
