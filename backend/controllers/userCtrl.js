const userModel = require("../Models/userModel");

const register = async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({
      success: true,
      message: " notification deleted",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in register",
      success: false,
      error,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel
      .findOne({ email, password })
      .select("-password");
    if (!user) {
      return res.status(404).send({
        message: "user noot found",
        success: false,
      });
    }
    res.status(200).send({
      success: true,
      message: "login success",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in login",
      success: false,
      error,
    });
  }
};

module.exports = { register, login };
