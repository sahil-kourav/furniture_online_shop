import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

// Helper function to create JWT token with expiration
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' }); 
};

// Route for user login
const registerUser = async (req, res) => {
  try {
    const { name, email, password, mobileNumber } = req.body;

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email" });
    }

    // Validate mobile number
    if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
      return res.status(400).json({ success: false, message: "Please enter a valid 10-digit mobile number" });
    }

    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters, include uppercase, number, and special character",
      });
    }

    // Check if user already exists
    const emailExists = await User.findOne({ where: { email } });
    if (emailExists) {
      return res.status(400).json({ success: false, message: "Email is already in use" });
    }

    const mobileExists = await User.findOne({ where: { mobileNumber } });
    if (mobileExists) {
      return res.status(400).json({ success: false, message: "Mobile number is already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email,
      mobileNumber,
      password: hashedPassword,
    });

    const token = createToken(newUser.id);
    res.status(201).json({ success: true, token, mobileNumber: newUser.mobileNumber });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Enter a valid email" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    const token = createToken(user.id);
    res.json({ success: true, token, mobileNumber: user.mobileNumber });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Route for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate admin credentials (stored securely in environment variables)
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = createToken(process.env.ADMIN_EMAIL); // Use admin email as the ID
      res.json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { loginUser, registerUser, adminLogin };
