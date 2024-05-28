// controllers/userController.js
const User = require("../model/user");

exports.createUser = async (req, res) => {
  try {
    const { fullName, email, phone, eventSession } = req.body;
    // Basic server-side validation
    if (!fullName || !phone || !eventSession) {
      return res.status(400).json({
        error: "Full Name, Phone Number, and Event Session are required",
      });
    }

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: "Email already exists",
      });
    }

    const newUser = new User({ fullName, email, phone, eventSession });
    await newUser.save();
    res.status(201).json({
      userData: newUser,
      message: "Registration successful",
      id: newUser._id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = exports;
