// import jwt from 'jsonwebtoken'

// const adminAuth = async (req,res,next) => {
//     try {
//         const { token } = req.headers
//         if (!token) {
//             return res.json({success:false,message:"Not Authorized Login Again"})
//         }
//         const token_decode = jwt.verify(token,process.env.JWT_SECRET);
//         if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
//             return res.json({success:false,message:"Not Authorized Login Again"})
//         }
//         next()
//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }
// }

// export default adminAuth







import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized Login Again" });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // Check if token's ID matches the ADMIN_EMAIL
    if (token_decode.id !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ success: false, message: "Not Authorized Login Again" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "Token expired or invalid, please login again" });
  }
};

export default adminAuth;
