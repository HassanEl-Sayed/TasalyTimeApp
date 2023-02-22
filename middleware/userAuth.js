const jwt = require('jsonwebtoken');
const User = require('../models/User');

const userAuth = async (req,res,next)=>{
    try {
        // const token = req.headers.token.split(" ")[1] 
        const token = req.header('Authorization').replace('Bearer ','')
        const verifyUser = jwt.verify(token, process.env.JWT_SECRETUSER)
        const user = await User.findOne({ _id: verifyUser._id })
        
        if(!user) throw new Error();
        
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({error:'Please Authenticate.'})
    }
}


module.exports = userAuth