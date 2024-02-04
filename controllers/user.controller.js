import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const loggedinUser = req.user._id;
    //get all users except the logged in user
    const getusers = await User.find({ _id: { $ne: loggedinUser } });
    res.status(200).json(getusers);
  } catch (error) {
    console.log(error);
  }
};

export const getUserId = async (req, res) => {
  try {
    const userid = req.user._id;
    res.status(200).json(userid);
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const getuserbyId = await User.findById(id);
    res.status(200).json(getuserbyId);
  } catch (error) {
    console.log(error);
  }
};
