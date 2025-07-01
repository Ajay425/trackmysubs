const jwt = require('jsonwebtoken');
const user = require('../models/User');

exports.protect = async (requestAnimationFrame, res ,next) => {
    let token = requestAnimationFrame.headers.authorization?.split("")[1];
    if (!token) return res.status(401).json({message: "Not Authorized, no token"});

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password')
        next();
    } catch (err) {
        res.status(401).json({message: "Not  authorized, token failed"});
    }
};