// import validator from "validator";
// import bcrypt from "bcrypt"
// import jwt from 'jsonwebtoken'
// import userModel from "../models/userModel.js";


// const createToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET)
// }

// // Route for user login
// const loginUser = async (req, res) => {
//     try {

//         const { email, password } = req.body;

//         const user = await userModel.findOne({ email });

//         if (!user) {
//             return res.json({ success: false, message: "User doesn't exists" })
//         }

//         const isMatch = await bcrypt.compare(password, user.password);

//         if (isMatch) {

//             const token = createToken(user._id)
//             res.json({ success: true, token })

//         }
//         else {
//             res.json({ success: false, message: 'Invalid credentials' })
//         }

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message })
//     }
// }

// // Route for user register
// const registerUser = async (req, res) => {
//     try {

//         const { name, email, password } = req.body;

//         // checking user already exists or not
//         const exists = await userModel.findOne({ email });
//         if (exists) {
//             return res.json({ success: false, message: "User already exists" })
//         }

//         // validating email format & strong password
//         if (!validator.isEmail(email)) {
//             return res.json({ success: false, message: "Please enter a valid email" })
//         }
//         if (password.length < 8) {
//             return res.json({ success: false, message: "Please enter a strong password" })
//         }

//         // hashing user password
//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(password, salt)

//         const newUser = new userModel({
//             name,
//             email,
//             password: hashedPassword
//         })

//         const user = await newUser.save()

//         const token = createToken(user._id)

//         res.json({ success: true, token })

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message })
//     }
// }

// // Route for admin login
// const adminLogin = async (req, res) => {
//     try {
        
//         const {email,password} = req.body

//         if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
//             const token = jwt.sign(email+password,process.env.JWT_SECRET);
//             res.json({success:true,token})
//         } else {
//             res.json({success:false,message:"Invalid credentials"})
//         }

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message })
//     }
// }


// export { loginUser, registerUser, adminLogin }




























// import validator from "validator";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import User from "../models/user.js"; 

// const createToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET);
// };

// // Route for user login
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ where: { email } });

//     if (!user) {
//       return res.json({ success: false, message: "User doesn't exist" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (isMatch) {
//       const token = createToken(user.id); // id hoti hai mysql mein
//       res.json({ success: true, token });
//     } else {
//       res.json({ success: false, message: "Invalid credentials" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // Route for user register
// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const exists = await User.findOne({ where: { email } });

//     if (exists) {
//       return res.json({ success: false, message: "User already exists" });
//     }

//     if (!validator.isEmail(email)) {
//       return res.json({ success: false, message: "Please enter a valid email" });
//     }

//     if (password.length < 8) {
//       return res.json({ success: false, message: "Please enter a strong password" });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     const token = createToken(newUser.id);

//     res.json({ success: true, token });

//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // Route for admin login
// const adminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
//       const token = jwt.sign(email + password, process.env.JWT_SECRET);
//       res.json({ success: true, token });
//     } else {
//       res.json({ success: false, message: "Invalid credentials" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// export { loginUser, registerUser, adminLogin };


















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

    // Check if user already exists by email or mobile number
    const emailExists = await User.findOne({ where: { email } });
    const mobileExists = await User.findOne({ where: { mobileNumber } });

    if (emailExists) {
      return res.status(400).json({ success: false, message: "Email is already in use" });
    }

    if (mobileExists) {
      return res.status(400).json({ success: false, message: "Mobile number is already in use" });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email" });
    }

    // Validate mobile number
    if (!validator.isLength(mobileNumber, { min: 10, max: 10 }) || !/^[0-9]{10}$/.test(mobileNumber)) {
      return res.status(400).json({ success: false, message: "Please enter a valid 10-digit mobile number" });
    }

    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
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

    // Check if the user exists by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ success: false, message: "User doesn't exist" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user.id);
      res.json({ success: true, token, mobileNumber: user.mobileNumber });
    } else {
      res.status(401).json({ success: false, message: "Incorrect email or password" });
    }
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
