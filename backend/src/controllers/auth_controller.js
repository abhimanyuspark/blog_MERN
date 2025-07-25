const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../config/utils");
const cloudinary = require("../config/cloudinary");
const { oauth2Client } = require("../config/google");
const axios = require("axios");

const signUp = async (req, res) => {
  try {
    const { email, fullName, password, profilePic, roles, bio } = req?.body;

    if (!email || !fullName || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    if (password.length < 6 || password.length > 10) {
      return res
        .status(400)
        .json({ message: "Password must be between 6 and 10 characters" });
    }

    const dup = await User.findOne({ email }).exec();
    if (dup) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashPwd = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      fullName,
      password: hashPwd,
      profilePic,
      roles,
      bio,
    });

    if (user) {
      generateToken(user._id, res);
      const { password, ...userData } = user._doc;
      userData.password = undefined;
      res.status(201).json(userData);
    } else {
      return res.status(400).json({ message: "User not created" });
    }
  } catch (error) {
    console.error("Error during sign up:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logIn = async (req, res) => {
  try {
    const { email, password } = req?.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(409).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);
    const { password: userPassword, ...userData } = user._doc;
    userData.password = undefined;
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error during sign in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({ message: "Sign out successful" });
  } catch (error) {
    console.error("Error during sign out:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req?.body;
    const userId = req?.user?.id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const upload = await cloudinary.uploader.upload(profilePic, {
      upload_preset: "blog",
      folder: "Blog",
    });
    if (!upload) {
      return res.status(500).json({ message: "Error uploading image" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: upload.secure_url },
      { new: true }
    );

    if (updatedUser) {
      const { password, ...userData } = updatedUser._doc;
      userData.password = undefined;
      res.status(200).json(userData);
    } else {
      return res.status(500).json({ message: "Error updating user" });
    }
  } catch (error) {
    console.error("Error during update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error("Error during check auth:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const googleLogin = async (req, res) => {
  try {
    const code = req.query.code;

    if (code) {
      const googleres = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(googleres.tokens);

      const userRes = await axios.get(
        `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${googleres.tokens.access_token}`
      );
      const { email, name, picture } = userRes.data;

      let user = await User.findOne({ email }).exec();

      if (!user) {
        const hashPwd = await bcrypt.hash(name, 10);
        user = await User.create({
          fullName: name,
          email,
          profilePic: picture,
          password: hashPwd,
        });
      }

      const { _id } = user;
      generateToken(_id, res);
      const { password, ...userData } = user._doc || user;
      userData.password = undefined;
      return res.status(200).json(userData);
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  signUp,
  logIn,
  logOut,
  updateProfile,
  checkAuth,
  googleLogin,
};
