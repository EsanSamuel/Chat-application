import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/jwt.js";

export const signIn = async (req, res) => {
  const { fullname, username, password, gender, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      res.status(500).json("Password doesnt match!");
    }

    const userExists = await User.findOne({ username });

    if (userExists) {
      res.status(500).json("User already exists");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const maleProfilePic = "";
    const femaleProfilePic = "";

    const user = new User({
      fullname,
      username,
      password: hashedPassword,
      gender,
      profilePicture: gender === "male " ? maleProfilePic : femaleProfilePic,
    });

    const token = generateToken(user._id, res);
    await user.save();
    res.status(201).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (isPasswordValid) {
      const token = generateToken(user._id, res);
      res.status(201).json({ user, token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
