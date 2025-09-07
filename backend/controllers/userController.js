import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res) => {
  try {
    const { name, email, password, img } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res

        .status(404)
        .json({ success: false, message: "User already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      img,
    });
    const savedUser = await newUser.save();
    //creating tokens(it proves who the user is)
    const token = jwt.sign(
      { id: savedUser._id, email: savedUser.email, name: savedUser.name }, // ✅ add name
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(200).json({
      success: true,
      message: "Registration successful",
      data: { user: savedUser, token },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name }, // ✅ add name
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: { user: user, token },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
