const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const generateToken = require("../config/generateToken")

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please input all fields",
        success: false,
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(password, salt); 

    const profilePicUrl = req.file ? req.file.path : null;

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profilePic: profilePicUrl,
    });

    await newUser.save();

    const token = generateToken(newUser);

    res.status(201).json({
      message: "User registered successfully",
      success: true,
      token,
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        profilePic: newUser.profilePic,
        role: newUser.role,
      },
    });

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      message: "Error registering user",
      success: false,
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter both email and password",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
      }
      
      const token = generateToken(user)


    // ✅ Success response
    res.status(200).json({
      message: "Login successful",
        success: true,
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isAdmin: user.isAdmin,
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Server error during login",
      success: false,
    });
  }
};
const getCurrentUser = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

const updateProfile = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userId = req.user._id;

    if (!username || !email) {
      return res.status(400).json({
        message: "Please input both username and email",
        success: false,
      });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Check if the email is already used by another user
    if (user.email !== email) {
      const userWithEmail = await User.findOne({ email });
      if (userWithEmail) {
        return res.status(400).json({
          message: "Email is already taken by another user",
          success: false,
        });
      }
    }

    // Handle password update
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    // Handle profile picture update (optional)
    const profilePicUrl = req.file ? req.file.path : null;
    if (profilePicUrl) {
      user.profilePic = profilePicUrl;
    }

    // Update user details
    user.username = username;
    user.email = email;

    // Save updated user data
    await user.save();

    // Send success response
    res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({
      message: "Error updating profile",
      success: false,
    });
  }
};

module.exports = { register, login, getCurrentUser, updateProfile };

