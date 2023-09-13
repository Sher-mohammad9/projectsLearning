const userSignUpModel = require("../../database/model/signUpModel.js");

const userAuthentication = async (req, resp, next) => {
  const userDetails = req.body;
  const urls = req.url.split("/");
  const registerAndLogin = urls[urls.length-1];
  if (userDetails.email && userDetails.password) {
    try {
      const user = await userSignUpModel.findOne({
        email: userDetails.email,
        password: userDetails.password,
      });
      if (user && registerAndLogin === "register") {
        resp.status(200).send({
          status: "Success",
          message: "User already SignUp",
        });
      } else if(user && registerAndLogin === "login"){
        next();
      } else if(user && registerAndLogin === "profile"){
        next();
      } else if(user && registerAndLogin === "delete"){
        next();
      } else if(!user){
        next();
      }else{
        resp.status(400).send({status : false, message : "User Not Found"});;
      }
    } catch (error) {
      resp.status(200).send({
        status: true,
        message: "Incorrect data",
        Error: error.message,
      });
    }
  }
};

module.exports = userAuthentication;
