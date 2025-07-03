const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res ,next) => {
    let token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({message: "Not Authorized, no token"});

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password')
        next();
    } catch (err) {
        res.status(401).json({message: "Not  authorized, token failed"});
    }
    console.log("Header:", req.headers.authorization);
    console.log("Token:", token);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
};

