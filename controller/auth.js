const User = require('../models/User');

exports.postSignup = async (req,res)=>{
    const newUser = new User(req.body)
    try {
        await newUser.save()
        res.status(201).json(newUser)
    } catch (e) {
        res.status(400).json(e.message)
    }
};

exports.postLogin = async (req,res)=>{
    try {
        const user = await User.isLogin(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        const {password,__v ,tokens, ...info} = user._doc;
        res.status(200).json({
            message:"Login Successfully",
            ...info,
            token
        })
    } catch (e) {
        res.status(400).json(e.message)
    }
};

exports.PostLogout = async (req , res) =>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error.message)
    }
};



