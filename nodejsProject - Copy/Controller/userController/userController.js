const userSignUpModel = require("../../database/model/signUpModel");

const userSingUp = async (req, resp) => {
  try {
    let userSignUp = await userSignUpModel.create(req.body);
    userSignUp = userSignUp.toObject();
    delete userSignUp.password;
    resp.status(201).send({
      status: "Success",
      message: "User successfully singUp",
      userDetails: userSignUp,
    });
  } catch (error) {
    resp.status(500).send({
      status: "Success",
      error: error.message,
    });
  }
};

const logInUser = async (req, resp) => {
  try {
    const user = await userSignUpModel.findOne(req.body).select("-password");
    resp.status(200).send({
      status: "Success",
      message: "LogIn User",
      userDetails: user,
    });
  } catch (error) {
    resp.status(500).send({
      status: "Success",
      Error: error.message,
    });
  }
};

const updateProfile = async (req, resp) => {
  const userDetails = req.body;
    try {
      const updateUser = await userSignUpModel.findOneAndUpdate(
        { email: userDetails.email, password: userDetails.password },
        { $set: userDetails }
      );
      if (updateUser) {
        resp.status(201).send({
          status: "Success",
          message: "Profile successfully update",
          updateProfile: updateUser,
        });
      }
    } catch (error) {
      resp.status(500).send({ status: "Success", Error: error.message });
    }
};


const deleteAccount = async (req, resp)=>{
  const userDetails = req.body;
   try{
    const userDelete = await userSignUpModel.findOneAndDelete({email: userDetails.email, password: userDetails.password})
    resp.status(200).send({status : "Succss", message : "User successfully delete", userDelete,})
  } catch(error){
    resp.status(500).send({status : "Success", Error : error.message});
  }
}

module.exports = {
  userSingUp,
  logInUser,
  updateProfile,
  deleteAccount,
};
